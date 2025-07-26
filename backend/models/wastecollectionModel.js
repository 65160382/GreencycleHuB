const pool = require("../config/database");

class WasteCollection {
  static async insertWasteCollection(
    public_id,
    secure_url,
    waste_type,
    weight,
    cusId
  ) {
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
}

module.exports = WasteCollection;
