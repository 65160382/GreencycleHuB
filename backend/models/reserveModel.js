const pool = require("../config/database");

class Reserve {
  // เพิ่มข้อมูลลง table reserve
  static async insertReserve(
    resCode,
    bookingDate,
    timeslot,
    amount,
    weight,
    cusId,
    addrId
  ) {
    try {
      const sql = `INSERT INTO reserve(res_status, res_code, res_booking_date, res_time_slot, res_amount, res_weight, res_create_at, res_update_at, cus_id, add_id) 
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)`;
      const [result] = await pool.query(sql, [
        "confirmed",
        resCode,
        bookingDate,
        timeslot,
        amount,
        weight,
        cusId,
        addrId,
      ]);
      return result.insertId; // ส่งค่า id ของ reserve กลับ
    } catch (error) {
      console.error("Error query Reserve table!", error);
      throw error;
    }
  }

  // ดึงข้อมูลการจองจาก table reserve
  static async getReserveById(reserveId) {
    try {
      const sql = `SELECT
  r.res_code,
  r.res_status,
  CONCAT(c.cus_fname,' ',c.cus_lname) AS customername,
  c.cus_email,
  r.res_booking_date,
  r.res_time_slot,
  r.res_amount,
  r.res_weight,
  a.add_province,
  a.add_district,
  a.add_subdistrict,
  a.add_road,
  a.add_houseno,
  a.add_postcode
FROM reserve AS r
JOIN customers AS c   ON c.cus_id = r.cus_id
JOIN address AS a   ON a.add_id = r.add_id
WHERE r.res_id = ?;`;
      // AND r.res_id = ?;`;
      const [result] = await pool.query(sql, [reserveId]);
      return result[0];
    } catch (error) {
      console.error("Error query Reserve table!", error);
      throw error;
    }
  }

  // ลูกค้าดึงข้อมูลการจองของตัวเอง
  static async getReserves(cusId, status = null, start = null, end = null) {
    try {
      let sql = `
      SELECT 
        r.res_id,
        r.res_code,
        r.res_booking_date,
        r.res_time_slot,
        r.res_status,
        r.res_amount,
        CONCAT(c.cus_fname,' ',c.cus_lname) AS customers_name
      FROM reserve AS r
      JOIN customers AS c ON c.cus_id = r.cus_id
      WHERE r.cus_id = ?
    `;

      const params = [cusId];

      if (status) {
        sql += ` AND r.res_status = ?`;
        params.push(status);
      }

      if (start && end) {
        sql += ` AND DATE(r.res_booking_date) BETWEEN ? AND ?`;
        params.push(start, end);
      }

      sql += ` ORDER BY r.res_create_at DESC`;

      const [result] = await pool.query(sql, params);
      return result;
    } catch (error) {
      console.error("Error query Reserve table!", error);
      throw error;
    }
  }

  static async getAllReserves(status = null) {
    try {
      let sql = `SELECT
                      r.res_id,
                      r.res_code,
                      r.res_booking_date,
                      r.res_time_slot,
                      r.res_status,
                      r.res_weight,
                      r.res_amount,
                      CONCAT_WS(' ', c.cus_fname, c.cus_lname) AS customers_name,
                      CONCAT_WS(' ', a.add_province, a.add_district, a.add_subdistrict, a.add_postcode) AS addressLine1,
                      CONCAT_WS(' ', a.add_houseno, a.add_road) AS addressLine2,
                      a.add_lat,
                      a.add_lon
                FROM reserve AS r
                JOIN customers  AS c ON r.cus_id = c.cus_id
                JOIN address    AS a ON r.add_id = a.add_id `;

      const params = [];

      if (status) {
        sql += ` WHERE r.res_status = ? `;
        params.push(status);
      }

      // console.log("After push",params)

      sql += ` ORDER BY r.res_create_at DESC; `;
      const [result] = await pool.query(sql, params);
      return result;
    } catch (error) {
      console.error("Error query Reserve Table!", error);
      throw error;
    }
  }


  static async getAllStatus() {
    try {
      const [result] = await pool.query(
        "SELECT r.res_status, COUNT(*) AS total FROM reserve AS r GROUP BY r.res_status;"
      );
      return result;
    } catch (error) {
      console.error("Error query Reserve Table!", error);
      throw error;
    }
  }


  // ใช้ Promise.all() แล้ว loop update ทีละรายการ
  // static async updateReserve(con, updateArray) {
  //   const sql = `UPDATE reserve SET res_status = ?, res_update_at = NOW() WHERE res_id = ?`;

  //   try {
  //     // สร้าง array ของ promises
  //     const promises = updateArray.map(([status, id]) =>
  //       con.query(sql, [status, id])
  //     );
  //     await Promise.all(promises);
  //     return true;
  //   } catch (error) {
  //     console.error("Error updating reserve table!", error);
  //     throw error;
  //   }
  // }

  // ปรับให้สามารถอัปเดตได้หลายกรณีทั้งส่งมาแบบ array และแบบปกติ
  static async updateReserve(con, updates) {
    const sql = `UPDATE reserve SET res_status = ?, res_update_at = NOW() WHERE res_id = ?`;

    try {
      // กรณีส่งหลายรายการ [["pending",2],["pending",3]]
      if (Array.isArray(updates[0])) {
        const promises = updates.map(([status, id]) =>
          con.query(sql, [status, id])
        );
        await Promise.all(promises);
      }
      // กรณีส่งแค่หนึ่งรายการ ["picking_up",2]
      else {
        const [status, id] = updates;
        await con.query(sql, [status, id]);
      }

      return true;
    } catch (error) {
      console.error("Error updating reserve table!", error);
      throw error;
    }
  }

  // ดึงข้อมูลขยะโดยรวมของแต่ละการจอง
  static async getReserveWasteSummary(resId) {
    try {
      const [rows] = await pool.query(
        `
    SELECT
      wc.rec_type_id,
      rt.rec_type_name,
      wc.waste_collect_price,
      SUM(wc.waste_collect_quantity) AS total_weight,
      SUM(wc.waste_collect_quantity * wc.waste_collect_price) AS total_price
    FROM reserve AS r
    JOIN reserve_detail AS rd ON rd.res_id = r.res_id
    JOIN waste_collection AS wc ON rd.waste_collect_id = wc.waste_collect_id
    JOIN recycle_type AS rt ON rt.rec_type_id = wc.rec_type_id
    WHERE r.res_id = ?
    GROUP BY
      wc.rec_type_id,
      rt.rec_type_name,
      wc.waste_collect_price
  `,
        [resId]
      );
      return rows;
    } catch (error) {
      console.error("Error query reserve table!", error);
      throw error;
    }
  }
}

module.exports = Reserve;
