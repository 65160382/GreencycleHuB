const tf = require("@tensorflow/tfjs");
const jpeg = require("jpeg-js"); // ใช้ jpeg-js เพื่อ decode ไฟล์ JPEG เป็น pixel data (RGB)
const URL = "https://teachablemachine.withgoogle.com/models/t2DhazXW-/"; // import model techablemahine
const cloudinary = require("../config/cloudinary");
const WasteCollection = require("../models/wasteCollectionModel");
const RecycleType = require("../models/recycleTypeModel");

// ตัวแปรเก็บโมเดล (global)
let model = null;

// โหลดโมเดลครั้งเดียว
const loadModel = async () => {
  if (!model) {
    const modelUrl = URL + "model.json";
    model = await tf.loadLayersModel(modelUrl); // โหลดไฟล์ model.json จาก Teachable Machine
    // console.log("โมเดลโหลดเรียบร้อยแล้ว");
  }
};

// แปลงไฟล์ภาพ (Buffer) เป็น Tensor ให้เหมาะสมกับโมเดล
const imageBufferToTensor = (imageBuffer) => {
  const decoded = jpeg.decode(imageBuffer, true); // decode jpeg → pixel data
  const imageTensor = tf.browser
    .fromPixels(decoded) // แปลงเป็น tensor
    .resizeBilinear([224, 224]) // ขนาดที่โมเดลต้องการ
    .toFloat()
    .div(tf.scalar(255)) //  Normalize พิกเซลให้อยู่ในช่วง 0-1
    .expandDims(); // เพิ่ม batch dim
  return imageTensor;
};

// version ทดสอบใช้  tenserflow/tfjs
exports.predictImage = async (req, res) => {
  try {
    await loadModel();

    const imageBuffer = req.file.buffer;
    const inputTensor = imageBufferToTensor(imageBuffer);

    const predictionData = await model.predict(inputTensor).data(); // Float32Array ของความน่าจะเป็นแต่ละ class (เรียงตามลำดับ labels)
    const prediction = Array.from(predictionData); // แปลงเป็น Array ปกติ

    // สร้าง array ของ label:
    const labels = [
      "Plastic-PET",
      "Plastic-HDPE",
      "Can",
      "BottleGlass",
      "Card-box",
      "Non-recyclable",
    ];

    //  หาค่า index ที่มีค่าความน่าจะเป็นสูงสุด
    const maxIndex = prediction.indexOf(Math.max(...prediction));
    const predictedLabel = labels[maxIndex];
    // หาค่าความน่าจะเป็นสูงสุด
    const maxProbability = prediction[maxIndex];

    // แปลงเป็นเปอร์เซ็นต์
    const percent = (maxProbability * 100).toFixed(2); // ปัดทศนิยม 2 ตำแหน่ง

    res.json({
      label: predictedLabel,
      probabilities: percent,
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการประมวลผลรูปภาพ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการประมวลผลรูปภาพ" });
  }
};

// อัพโหลดรูปภาพโดยใช้ cloudinary
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "ไม่พบไฟล์ที่อัปโหลด" });
    }

    const fileBuffer = req.file.buffer;

    // แปลง buffer เป็น base64 string
    const base64Image = fileBuffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64Image}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      public_id: `Recycle-${Date.now()}`,
      resource_type: "image",
      folder: "Recycle-collect",
    });

    const public_id = result.public_id; // เก็บข้อมูล public_id
    const secure_url = result.secure_url; // เก็บข้อมูล secure_url
    res.status(200).json({ message: "บันทึกข้อมูลง Cloudinary เรียบร้อย!",public_id, secure_url }); // ส่ง public_id , secure_url ไปให้ react
  } catch (error) {
    console.error("อัปโหลดไม่สำเร็จ:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};

// เรียกใช้ api ที่อัพเดตตาราง waste_collection (public url ใน cloudinary , wasteType , weight , cus_id = ?)
exports.createWasteCollection = async (req, res) => {
  try {
    // รับค่า public_id, secure_url, wastetype, weight
    const { public_id, secure_url, waste_type, weight } = req.body;

    // รับค่า cus_id จาก token/session
    const cusId = req.user.cus_id;
    // console.log("cusid",cusId)

    // ค้นหา id ประเภทขยะจากชื่อที่ได้รับมา
    const [recycleTypeRow] = await RecycleType.getrecycleTypeByName(waste_type);
    const { rec_type_id: recycleTypeId } = recycleTypeRow; // destuctering เอา id พร้อมเปลี่ยนชื่อ
    
    // เพิ่มข้อมูลลง table waste_collection
    const result = await WasteCollection.insertWasteCollection(
      public_id,
      secure_url,
      recycleTypeId,
      weight,
      cusId
    );
    if (!result) {
      res.status(400).json({ message: "ไม่สามารถเพิ่มข้อมูลได้" });
    }

    // res.json({ result });
    res.status(200).json({ message: "บันทึกข้อมูลสำเร็จ!"})
  } catch (error) {
    console.error("อัปโหลดไม่สำเร็จเกิดข้อผิดพลาด!:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};
