const pool = require("../config/database");

class Timetabledetail {
  static async insertTimetabledetail(values) {
    try {
      const sql = `INSERT INTO timetable_detail(time_id, res_id, time_start, time_arrive) VALUES ?`;
      const [rows] = await pool.query(sql,[values]);
      return rows;
    } catch (error) {
      console.error("Error query Timetabledetail! ", error);
      throw error;
    }
  }
}

module.exports = Timetabledetail;
