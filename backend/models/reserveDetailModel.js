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

  static async getReserveDetailById(resId){
    try {
      const sql = `SELECT 
        wc.rec_type_id, 
        rt.rec_type_name, 
        SUM(wc.waste_collect_quantity) AS total_weight, 
        rt.rec_type_price,
        SUM(wc.waste_collect_quantity * rt.rec_type_price) AS total_price
      FROM waste_collection AS wc
      JOIN reserve_detail AS rd ON rd.waste_collect_id = wc.waste_collect_id
      JOIN recycle_type AS rt ON rt.rec_type_id = wc.rec_type_id
      WHERE rd.res_id = ? 
      GROUP BY wc.rec_type_id, rt.rec_type_name, rt.rec_type_price;`;
      const [result] = await pool.query(sql,[resId]);
      return result;
    } catch (error) {
      console.error("Error query ReserveDetail Table!", error);
      throw error;
    }
  }
}
module.exports = ReserveDetail;
