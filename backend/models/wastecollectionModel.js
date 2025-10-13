const pool = require("../config/database");

class WasteCollection {
  static async insertWasteCollection(
    public_id,
    secure_url,
    waste_type,
    recyclePrice,
    weight,
    cusId
  ) {
    try {
      const sql = `INSERT INTO waste_collection (waste_collect_quantity, waste_collect_public_id, waste_collect_secure_url, waste_collect_price,
      waste_collect_sold, waste_collect_created_at, waste_collect_update_at, cus_id, rec_type_id)
      VALUES(?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)`;
      const result = await pool.query(sql, [
        weight,
        public_id,
        secure_url,
        recyclePrice,
        false, // ขายหรือยัง = false
        cusId,
        waste_type,
      ]);
      return result;
    } catch (error) {
      console.error("Error query wastecollection table!", error);
      throw error;
    }
  }

  // ดึงข้อมูลจาก table waste_collection ตาม cus_id พร้อมคำนวณผลรวมของน้ำหนัก
  static async getWasteBytype(cusId) {
    try {
      // รวมค่าของผลลัพธ์ในฟิลด์ waste_collect_quantity แล้วเปลี่ยนเป็นชื่อ AS total_weight
      const sql = `SELECT wt.rec_type_id, rt.rec_type_name, rt.rec_type_price,rt.rec_type_public_id,
      SUM(wt.waste_collect_quantity) AS total_weight,
      SUM(wt.waste_collect_quantity * rt.rec_type_price) AS total_price
      FROM
      waste_collection wt
      JOIN
      recycle_type rt ON wt.rec_type_id = rt.rec_type_id
      WHERE
      wt.cus_id = ? AND wt.waste_collect_sold = FALSE
      GROUP BY
      wt.rec_type_id,
      rt.rec_type_name,
      rt.rec_type_price,
      rt.rec_type_public_id
      ORDER BY total_price DESC;`; 
      const result = await pool.query(sql, [cusId]);
      return result;
    } catch (error) {
      console.error("Error query wastecollection table!", error);
      throw error;
    }
  }

  // ค้นหา id waste_collection ของ cus_id ตามประเภท rectypeId 
  static async findWasteCollectionById(con,rectypeId, cusId){
    try {
      const sql = `SELECT waste_collect_id FROM waste_collection WHERE rec_type_id IN (?) AND waste_collect_sold = false AND cus_id = ?;`;
      const [result] = await con.query(sql,[rectypeId,cusId]);
      return result;
    } catch (error) {
      console.error("Error query WasteCollection table!",error);
      throw error;
    }
  }

  // อัปเดตสถานะ waste_collect_sold เป็น true 
  static async updateWastecollectionById(con,wasteIds){
    try {
      const sql = `UPDATE waste_collection
               SET waste_collect_sold = true, waste_collect_update_at = NOW()
               WHERE waste_collect_id IN (?)`;
      await con.query(sql,[wasteIds]);
      return true;
    } catch (error) {
      console.error("Error query WasteCollection table!", error);
      throw error;
    }
  }

  // อัปเดตสถานะ waste_collect_sold เป็น false
  static async updateWastecollectionSoldById(con,wasteIds){
    try {
      await con.query(
      `UPDATE waste_collection
       SET waste_collect_sold = false, waste_collect_update_at = NOW()
       WHERE waste_collect_id IN (?)`,
      [wasteIds]
    );
    return true;
    } catch (error) {
      console.error("Error to query WasteCollection table!",error);
      throw error;
    }
  }
}

module.exports = WasteCollection;
