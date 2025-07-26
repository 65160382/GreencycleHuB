const pool = require("../config/database");

class recycleType {
  static async getrecycleTypeByName(waste_type) {
    try {
      const sql = `SELECT * FROM recycle_type WHERE rec_type_name = ?`;
      const [result] = await pool.query(sql, [waste_type]);
      return result;
    } catch (error) {
      console.error("Errror query recycle_type table!", error);
      throw error;
    }
  }
}

module.exports = recycleType;
