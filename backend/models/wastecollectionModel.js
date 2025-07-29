const pool = require("../config/database");

class WasteCollection {
  static async insertWasteCollection(public_id,secure_url,waste_type,weight,cusId) {
    try {
      const sql = `INSERT INTO waste_collection (waste_collect_quantity, waste_collect_public_id, waste_collect_secure_url, waste_collect_sold, 
      waste_collect_created_at, waste_collect_update_at, cus_id, rec_type_id)
      VALUES(?, ?, ?, ?, NOW(), NOW(), ?, ?)`;
      const result = await pool.query(sql, [
        weight,
        public_id,
        secure_url,
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
      const sql = `SELECT rec_type_id, SUM(waste_collect_quantity) AS total_weight
      FROM waste_collection
      WHERE cus_id = ? 
      GROUP BY rec_type_id;`; //จัดกลุ่มข้อมูลตาม id ประเภทขยะ
      const result = await pool.query(sql, [cusId]);
      return result;
    } catch (error) {
      console.error("Error query wastecollection table!", error);
      throw error;
    }
  }
}

module.exports = WasteCollection;
