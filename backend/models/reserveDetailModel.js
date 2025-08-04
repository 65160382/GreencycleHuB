const pool = require("../config/database");

class ReserveDetail {
  static async insertReserveDetail() {
    try {
      const sql = ``;
      const result = await pool.query(sql, []);
      return result;
    } catch (error) {
      console.error("Error query ReserveDetail Table!");
      throw error;
    }
  }
}
module.exports = ReserveDetail;
