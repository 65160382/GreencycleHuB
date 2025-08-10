const pool = require("../config/database");

class ReserveDetail {
  static async insertReserveDetail(values) {
    try {
      const sql = `INSERT INTO reserve_detail (res_id, waste_collect_id) VALUES ?`;
      const result = await pool.query(sql, [values]);
      return result;
    } catch (error) {
      console.error("Error query ReserveDetail Table!");
      throw error;
    }
  }
}
module.exports = ReserveDetail;
