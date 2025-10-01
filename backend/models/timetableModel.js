const pool = require("../config/database");

class Timetable {
  static async insertTimetable(con, assigndate, assigntimeslot, driveId) {
    try {
      const sql = `INSERT INTO timetable (time_date, time_time_slot, time_starttime, time_finishtime, time_create_at, driv_id) 
      VALUES (?,?,NULL,NULL,NOW(),?)`;
      const [rows] = await con.query(sql, [
        assigndate,
        assigntimeslot,
        driveId,
      ]);
      return rows.insertId;
    } catch (error) {
      console.error("Error query Timetable table!", error);
      throw error;
    }
  }

  static async fetchTimetable(driv_id, date) {
    const sql = `SELECT
t.time_id,
t.time_date,
t.time_time_slot,
t.driv_id,
td.res_id,
td.time_index,
r.res_weight,
a.add_lat,
a.add_lon,
CONCAT_WS(' ', a.add_province, a.add_district, a.add_subdistrict, a.add_postcode) AS addressLine1,
CONCAT_WS(' ', a.add_houseno, a.add_road) AS addressLine2
FROM timetable AS t
JOIN timetable_detail AS td ON t.time_id = td.time_id
JOIN reserve AS r ON td.res_id = r.res_id
JOIN address AS a ON r.add_id = a.add_id
WHERE t.driv_id = ? AND  t.time_date = ?
ORDER BY t.time_time_slot ASC, td.time_index ASC;
`;
    const [rows] = await pool.query(sql, [driv_id, date]);
    return rows;
  }

  static async fetchTimetablebyid(timeId) {
    const sql = `SELECT
t.time_id,
t.time_date,
t.driv_id,
td.res_id,
td.time_index,
r.cus_id,
CONCAT_WS(' ', c.cus_fname, c.cus_lname) AS customers_name,
c.cus_phone,
c.cus_email,
CONCAT_WS(' ', a.add_province, a.add_district, a.add_subdistrict, a.add_postcode) AS addressLine1,
CONCAT_WS(' ', a.add_houseno, a.add_road) AS addressLine2,
a.add_lat,
a.add_lon
FROM timetable AS t
JOIN timetable_detail AS td ON t.time_id = td.time_id
JOIN reserve AS r ON td.res_id = r.res_id
JOIN address AS a ON r.add_id = a.add_id
JOIN customers AS c ON r.cus_id = c.cus_id
WHERE t.time_id = ?
ORDER BY td.time_index ASC;`;
    const [rows] = await pool.query(sql, [timeId]);
    return rows;
  }
}

module.exports = Timetable;
