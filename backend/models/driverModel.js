const pool = require("../config/database");

class driver {
  static async getdriverAvaiable(date, timeslot) {
    try {
      const sql = `SELECT d.driv_id,
          CONCAT(d.driv_fname," " ,d.driv_lname) AS driv_name , 
          d.driv_phone, 
          d.driv_license_plate
        FROM driver AS d 
        WHERE d.driv_status = 'ว่าง' AND NOT EXISTS ( SELECT 1 FROM timetable AS t WHERE t.driv_id = d.driv_id AND t.time_date = ? AND t.time_time_slot = ? );`;
      const [rows] = await pool.query(sql, [date, timeslot]);
      return rows;
    } catch (error) {
      console.error("Error query driver table!", error);
      throw error;
    }
  }
}

module.exports = driver;
