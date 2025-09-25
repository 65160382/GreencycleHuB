const pool = require("../config/database");

class driver {
  // ตรวจสอบคนขับรถที่ว่าง โดยเทียบจากวันที่เลือกใน input fileds
  static async getdriverAvaiable(date, timeslot) {
    try {
      const sql = `SELECT d.driv_id,
          CONCAT(d.driv_fname," " ,d.driv_lname) AS driv_name , 
          d.driv_phone, 
          d.driv_license_plate
        FROM driver AS d 
        WHERE d.driv_status = 'available' AND NOT EXISTS ( SELECT 1 FROM timetable AS t WHERE t.driv_id = d.driv_id AND t.time_date = ? AND t.time_time_slot = ? );`;
      const [rows] = await pool.query(sql, [date, timeslot]);
      return rows;
    } catch (error) {
      console.error("Error query driver table!", error);
      throw error;
    }
  }

  // ดึงข้อมูลคนขับรถตาม user_id
  static async fetchDriverdata(user_id){
    try {
      const [rows] = await pool.query("SELECT driv_id, driv_fname, driv_lname, driv_phone, driv_license_plate FROM driver WHERE users_id = ?",[user_id]);
      return rows;
    } catch (error) {
      console.error("Error query driver table!", error);
      throw error;
    }
  }

}

module.exports = driver;
