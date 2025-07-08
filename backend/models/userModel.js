const pool = require("../config/database");
const bcrypt = require("bcryptjs");

class User {
  static async checkPassword(password,userPass) {
    try {
      const match = bcrypt.compareSync(password,userPass.users_password);
      return match;
    } catch (err) {
      console.error("Error check password:", err);
      throw err;
    }
  }

  static async checkEmailQuery(email) {
    try {
      const [check] = await pool.query(
        "SELECT * FROM users WHERE users_email = ?",
        [email]
      );
      return check;
    } catch (err) {
      console.error("Error query email!", err);
      throw err;
    }
  }

  static async createUser(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserQuery = `
      INSERT INTO users (users_email, users_password, roles_id, users_create_at)
      VALUES (?, ?, 3, NOW())
    `;
      const [result] = await pool.query(insertUserQuery, [
        email,
        hashedPassword,
      ]);
      return result.insertId;
    } catch (err) {
      console.error("Error execute user!", err);
      throw err;
    }
  }
}

module.exports = User;
