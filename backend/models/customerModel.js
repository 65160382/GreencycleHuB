const pool = require("../config/database");

class Customer {
    static async createCustomer(fristname,lastname,email,userid){
        try {
            const sql = `INSERT INTO customers (cus_fname, cus_lname, cus_email, users_id ) VALUES (?, ?, ?, ?)`
            const [result] = await pool.query(sql,[fristname,lastname,email,userid]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getCustomer(uid){
        try {
            const sql = `SELECT * FROM customers WHERE users_id = ?`;
            const [result] = await pool.query(sql, [uid]);  
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Customer;
