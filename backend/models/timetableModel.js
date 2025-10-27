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
  t.time_status,
  t.driv_id,
  td.res_id,
  td.time_index,
  r.res_weight,
  a.add_lat,
  a.add_lon,
  CONCAT_WS(' ', a.add_province, a.add_district, a.add_subdistrict, a.add_postcode) AS addressLine1,
  CONCAT_WS(' ', a.add_houseno, a.add_road) AS addressLine2
FROM timetable AS t
LEFT JOIN timetable_detail AS td ON t.time_id = td.time_id
LEFT JOIN reserve AS r ON td.res_id = r.res_id
LEFT JOIN address AS a ON r.add_id = a.add_id
WHERE t.driv_id = ?
  AND t.time_date = ?
  AND t.time_status IN ('pending', 'in_progress')
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
t.time_time_slot,
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

  // อัปเดต starttime
  static async updateTimetableStart(timeId) {
    try {
      await pool.query(
        `UPDATE timetable
SET time_status = 'in_progress', time_starttime = NOW()
WHERE time_id = ?`,
        timeId
      );
      return true;
    } catch (error) {
      console.error("Error query update TimetableTable", error);
      throw error;
    }
  }

  // อัปเดต finishtime
  static async updateTimetableFinish(timeId) {
    try {
      await pool.query(
        `UPDATE timetable
SET time_status = 'completed', time_finishtime = NOW()
WHERE time_id = ?`,
        timeId
      );
      return true;
    } catch (error) {
      console.error("Error query update TimetableTable", error);
      throw error;
    }
  }

  // ดึงข้อมูลสถานะเป็นจำนวนในแต่ละวันของคนขับ
  static async getDriverTaskSummary(drivId) {
    const sql = `
    SELECT
      COUNT(r.res_id) AS total_tasks,
      SUM(CASE WHEN r.res_status IN ('picking_up','complete') THEN 1 ELSE 0 END) AS completed_tasks,
      SUM(CASE WHEN r.res_status = 'pending' THEN 1 ELSE 0 END) AS pending_tasks
    FROM timetable AS t
    JOIN timetable_detail AS td ON t.time_id = td.time_id
    JOIN reserve AS r ON td.res_id = r.res_id
    WHERE t.driv_id = ?
      AND DATE(t.time_date) = CURDATE();
  `;

    const [rows] = await pool.query(sql, [drivId]);
    return rows[0];
  }
}

module.exports = Timetable;
