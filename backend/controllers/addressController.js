const Address = require("../models/addressModel");

// ดึงข้อมูล address ตาม ผู้ใช้
exports.getAllAddress = async (req, res) => {
  try {
    // const { cusId } = req.query;
    const cusId = req.user.cus_id
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
    res.status(200).json( {result} );
  } catch (error) {
    console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!",error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!" });
  }
};

// เพิ่มข้อมูลที่อยู่ ฟิลด์ province, district, subdistrict, road, houseno, postcode, lat, lon, isDefault,
exports.createAddress = async (req, res) => {
  try {
    const {
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
    } = req.body;
    const result = await Address.createAddress(
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
    const addId  = req.params.id;
    const result = await Address.updateDefaultAddress(cusId, addId);
    if(result){
      res.status(200).json({ message: "อัปเดตที่อยู่เริ่มต้นสำเร็จ!"});
    }else{
      res.status(400).json({ message: "เกิดข้อผิดพลาดไม่สามารถอัปเดตที่อยู่ได้"});
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!" });
  }
};

//ลบข้อมูลที่อยู่
exports.deleteAddress = async (req, res) => {
  try {
    const add_id  = req.params.id;
    const result = await Address.deleteAddress(add_id);
    if (result) {
      res.status(200).json({ message: "ลบที่อยู่สำเร็จ!" });
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!" });
  }
};
