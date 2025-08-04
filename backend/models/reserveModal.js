const pool  = require("../config/database");

class Reserve{
    static async insertReserve(resCode,bookingDate,timeslot,amount,cusId,addrId){
        try {
            const sql = `INSERT INTO reserve( res_status, res_code, res_booking_date, res_time_slot, res_amount, res_create_at, cus_id, add_id) 
            VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)`;
            const [result] = await pool.query(sql,['ยืนยันการจอง',resCode,bookingDate,timeslot,amount,cusId,addrId]);
            return result.insertId; // ส่งค่า id ของ reserve กลับ
        } catch (error) {
            console.error("Error query Reserve table!",error)
            throw error;
        }
    }
}

module.exports = Reserve;
