const { Add } = require("@tensorflow/tfjs");
const pool = require("../config/database");

class Address {
  // ดึงข้อมูลที่อยู่ทั้งหมดตาม id ผู้ใช้
  static async getAddress(cusId) {
    try {
      const sql = `SELECT * FROM address WHERE cus_id = ?;`;
      const [result] = await pool.query(sql, [cusId]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // ดึงข้อมูลทื่อยู่เฉพาะค่า default
  static async getDefaultAddress(cusId) {
    try {
      const sql = `SELECT * FROM address WHERE cus_id = ? AND add_default = true`;
      const [result] = await pool.query(sql, [cusId]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // เพิ่มข้อมูลที่อยู่
  static async createAddress(
    province,
    district,
    subdistrict,
    road,
    houseno,
    postcode,
    lat,
    lon,
    isDefault,
    cusId
  ) {
    try {
      const sql = `INSERT INTO address( add_province, add_district, add_subdistrict, add_road, add_houseno, add_postcode, add_lat, add_lon, add_default, cus_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const result = await pool.query(sql, [
        province,
        district,
        subdistrict,
        road,
        houseno,
        postcode,
        lat,
        lon,
        isDefault,
        cusId,
      ]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // อัปเดตที่อยู่เริ่มต้น
  static async updateDefaultAddress(cusId, addId) {
    try {
      // รีเซ็ทที่อยู่
      await pool.query("UPDATE address SET add_default = 0 WHERE cus_id = ?", [cusId]);

      // อัปเดตที่อยู่ deafult ใหม่
      const [result] = await pool.query(
        "UPDATE address SET add_default = 1 WHERE cus_id = ? AND add_id = ?",
        [cusId, addId]
      );

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // ลบที่อยู่
  static async deleteAddress(add_id) {
    try {
      const result = await pool.query("DELETE FROM address WHERE add_id = ?", [
        add_id,
      ]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = Address;
