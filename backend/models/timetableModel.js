const pool = require("../config/database");

class Timetable {
  static async insertTimetable(con,assigndate,assigntimeslot,driveId) {
    try {
      const sql = `INSERT INTO timetable (time_date, time_time_slot, time_starttime, time_finishtime, time_create_at, driv_id) 
      VALUES (?,?,NULL,NULL,NOW(),?)`;
      const [rows] = await con.query(sql,[assigndate,assigntimeslot,driveId]);
      return rows.insertId;
    } catch (error) {
      console.error("Error query Timetable table!", error);
      throw error;
    }
  }
}

module.exports = Timetable;
