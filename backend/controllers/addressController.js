const Address = require("../models/addressModel");

// ดึงข้อมูล address ตาม ผู้ใช้
exports.getAllAddress = async (req, res) => {
  try {
    // const { cusId } = req.query;
    const cusId = req.user.cus_id;
    const result = await Address.getAddress(cusId);
    // console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!" });
  }
};

//ดึงข้อมูลเฉพาะค่าที่อยู่เริ่มต้น
exports.getDefaultAddress = async (req, res) => {
  try {
    const cusId = req.user.cus_id;
    const result = await Address.getDefaultAddress(cusId);
    res.status(200).json({ result });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!" });
  }
};

exports.getAddressById = async(req,res) => {
  try {
    const id = req.params.id; // รับ address id จาก params
    const result = await Address.getAddressById(id);
    return res.status(200).json({ result});
  } catch (error) {
    console.log("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์",error);
  }
}

// เพิ่มข้อมูลที่อยู่ ฟิลด์ province, district, subdistrict, road, houseno, postcode, lat, lon, isDefault,
exports.createAddress = async (req, res) => {
  try {
    const {
      add_province,
      add_district,
      add_subdistrict,
      add_road,
      add_houseno,
      add_moo,
      add_postcode,
      add_lat,
      add_lon,
      add_default,
    } = req.body;

    const cusId = req.user.cus_id; //ดึง cus_id จาก req.user

    // ตรวจสอบว่ามีการเลือก ที่อยู่เริ่มต้นไหม 
    if(add_default === true || add_default === 1){
      await Address.resetDefaultAddress(cusId);
    }

    const result = await Address.createAddress(
      add_province,
      add_district,
      add_subdistrict,
      add_road,
      add_houseno,
      add_moo,
      add_postcode,
      add_lat,
      add_lon,
      add_default,
      cusId
    );
 
    if (result) {
      res.status(200).json({ message: "เพิ่มข้อมูลสำเร็จ!" });
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!" });
  }
};

//แก้ไขข้อมูลที่อยู่
exports.updateDeafultAddress = async (req, res) => {
  try {
    const cusId = req.user.cus_id;
    const addId = req.params.id;
    const result = await Address.updateDefaultAddress(cusId, addId);
    if (result) {
      res.status(200).json({ message: "อัปเดตที่อยู่เริ่มต้นสำเร็จ!" });
    } else {
      res
        .status(400)
        .json({ message: "เกิดข้อผิดพลาดไม่สามารถอัปเดตที่อยู่ได้" });
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!" });
  }
};

// อัพเดตข้อมูลที่อยู่
exports.updateAddress = async (req,res) => {
  try {
    const id = req.params.id;
    const cusId = req.user.cus_id; //ดึง cus_id จาก req.user
    const data = req.body;

    // destructer ค่า แล้วรวมไว้ที่ตัวแปรเดียว
    const {
      add_province,
      add_district,
      add_subdistrict,
      add_postcode,
      add_road,
      add_houseno,
      add_moo,
      add_default,
      add_lat,
      add_lon,
    } = data;

    // ตรวจสอบว่ามีการเลือก ที่อยู่เริ่มต้นไหม 
    if(add_default === true || add_default === 1){
      await Address.resetDefaultAddress(cusId);
    }

    const result = await Address.updateAddress(id, {
      add_province,
      add_district,
      add_subdistrict,
      add_postcode,
      add_road,
      add_houseno,
      add_moo,
      add_default,
      add_lat,
      add_lon,
      cus_id: cusId, // เพิ่มเพื่อใช้ reset default เฉพาะ user นี้
    });
    
    if(result){
      return res.status(200).json({ message: "อัพเดตข้อมูลสำเร็จ!"})
    }
  } catch (error) {
    console.log("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์",error);
  }
}

//ลบข้อมูลที่อยู่
exports.deleteAddress = async (req, res) => {
  try {
    const add_id = req.params.id;
    const result = await Address.deleteAddress(add_id);
    if (result) {
      res.status(200).json({ message: "ลบที่อยู่สำเร็จ!" });
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!" });
  }
};
