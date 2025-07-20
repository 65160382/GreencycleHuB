const tf = require('@tensorflow/tfjs');
const jpeg = require('jpeg-js'); // ใช้สำหรับ decode jpeg images

const URL = "https://teachablemachine.withgoogle.com/models/t2DhazXW-/";

// ตัวแปรเก็บโมเดล (global)
let model = null;

// โหลดโมเดลครั้งเดียว
const loadModel = async () => {
  if (!model) {
    const modelUrl = URL + "model.json";
    model = await tf.loadLayersModel(modelUrl);  // รับแค่ modelUrl ตัวเดียว
    console.log("โมเดลโหลดเรียบร้อยแล้ว");
  }
};

// แปลงไฟล์ภาพ (Buffer) เป็น Tensor ให้เหมาะสมกับโมเดล
const imageBufferToTensor = (imageBuffer) => {
  const decoded = jpeg.decode(imageBuffer, true); // decode jpeg → pixel data
  const imageTensor = tf.browser.fromPixels(decoded) // แปลงเป็น tensor
    .resizeNearestNeighbor([224, 224]) // ขนาดที่โมเดลต้องการ
    .toFloat()
    .expandDims(); // เพิ่ม batch dim
  return imageTensor;
};

// version ทดสอบ
exports.predictImage = async (req, res) => {
  try {
    await loadModel();

    const imageBuffer = req.file.buffer;
    const inputTensor = imageBufferToTensor(imageBuffer);

    const predictionData = await model.predict(inputTensor).data(); // Float32Array
    const prediction = Array.from(predictionData); // แปลงเป็น Array ปกติ
    // สร้าง array ของ label:
    const labels = ["pet", "hdpe", "can", "glass", "card", "Non-recyclable"];

    //  หาค่า index ที่มีค่าความน่าจะเป็นสูงสุด
    const maxIndex = prediction.indexOf(Math.max(...prediction));
    const predictedLabel = labels[maxIndex];

    console.log("ผลการทำนาย:", predictedLabel, prediction);

    res.json({
      label: predictedLabel,
      probabilities: prediction.map((p, i) => ({ label: labels[i], probability: p }))
    });

  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการประมวลผลรูปภาพ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการประมวลผลรูปภาพ" });
  }
};

