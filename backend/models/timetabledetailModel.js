const pool = require("../config/database");

class Timetabledetail {
  static async insertTimetabledetail(con,values) {
    try {
      const sql = `INSERT INTO timetable_detail(time_id, time_index, res_id, time_start, time_arrive) VALUES ?`;
      const [rows] = await con.query(sql,[values]);
      return rows;
    } catch (error) {
      console.error("Error query Timetabledetail! ", error);
      throw error;
    }
  }

  // update time_start timestamp
  static async updateTimestartByid(con,resId){
    try {
      await con.query(`UPDATE timetable_detail AS td SET td.time_start = NOW() WHERE td.res_id = ?`,resId);
      return true;
    } catch (error) {
      console.error("Error update query Timetabledetail ", error);
      throw error;
    }
  }

  // update time_arrive timestamp
  static async updateTimearriveByid(con,resId){
    try {
      await con.query(`UPDATE timetable_detail AS td SET td.time_arrive = NOW() WHERE td.res_id = ?`,resId);
      return true;
    } catch (error) {
      console.error("Error update query Timetabledetail ", error);
      throw error;
    }
  }
}


module.exports = Timetabledetail;
