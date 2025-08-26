const pool = require("../config/database");

class Reserve {
  // เพิ่มข้อมูลลง table reserve
  static async insertReserve(resCode,bookingDate,timeslot,amount,weight,cusId,addrId) {
    try {
      const sql = `INSERT INTO reserve(res_status, res_code, res_booking_date, res_time_slot, res_amount, res_weight, res_create_at, cus_id, add_id) 
      VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?)`;
      const [result] = await pool.query(sql, ["ยืนยันการจอง",resCode,bookingDate,timeslot,amount,weight,cusId,addrId]);
      return result.insertId; // ส่งค่า id ของ reserve กลับ
    } catch (error) {
      console.error("Error query Reserve table!", error);
      throw error;
    }
  }

  // ดึงข้อมูลการจองจาก table reserve
  static async getReserveById(cusId,reserveId) {
    try {
      const sql = `SELECT
  r.res_code,
  r.res_status,
  CONCAT(c.cus_fname,' ',c.cus_lname) AS customername,
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
WHERE r.cus_id = ?
  AND r.res_id = ?;`;
      const [result] = await pool.query(sql, [cusId,reserveId]);
      return result[0];
    } catch (error) {
      console.error("Error query Reserve table!", error);
      throw error;
    }
  }

  // static async getAllReserves(cusId){
  //   try {
  //     const sql = `SELECT 
  //                   r.res_id,
  //                   r.res_code,
  //                   r.res_booking_date,
  //                   r.res_time_slot,
  //                   r.res_status,
  //                   r.res_amount,
  //               CONCAT(c.cus_fname,' ',c.cus_lname) AS customers_name
  //               FROM reserve AS r
  //               JOIN customers AS c ON c.cus_id = r.cus_id 
  //               WHERE r.cus_id = ? 
  //               ORDER BY r.res_create_at DESC;`;
  //     const [result] = await pool.query(sql, [cusId]);
  //     return result;
  //   } catch (error) {
  //     console.error("Error query Reserve table!", error);
  //     throw error;
  //   }
  // }

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


  // static async queryReserveStatus(cusId,status){
  //   try {
  //     const sql = `SELECT * FROM reserve WHERE cus_id = ? AND res_status = ?;`;
  //     const [result] = await pool.query(sql,[cusId,status]);
  //     return result;
  //   } catch (error) {
  //     console.error("Error query reserve table!",error);
  //     throw error;
  //   }
  // }

}

module.exports = Reserve;
