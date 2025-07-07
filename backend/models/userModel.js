const pool = require("../config/database");
const bcrypt = require("bcryptjs");

class User {
  static async findOne(email,password){
    try{
      const [results] = await pool.query('SELECT * FROM users WHERE users_email = ?',[email]);
      return [results];
    }catch(err){
      console.error("Error fetching users:", err);
      throw err;
    }
  }

  static async register(email,password){
      try {
        const hashedPassword = await bcrypt.hash(password,10);
        const sql = `INSERT INTO users (users_email, users_password , roles_id, users_create_at) VALUES (?,?,3,now())`;
        const [results] = await pool.execute(sql,[email ,hashedPassword]);
        return  results;
      } catch (err) {
        console.error("Error execute user!")
        throw err;
      }
  }
}

module.exports = User;
