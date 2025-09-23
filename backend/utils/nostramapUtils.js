const axios = require("axios");
require("dotenv").config();
const BASE_URL = "https://api.nostramap.com/Service/V2/Network/ClosestFacility";

// exports.fetchClosetFacility = async (resId) => {
//   try {
//     const url = "https://api.nostramap.com/Service/V2/Network/ClosestFacility";

//     const incident = [{ name: "Company", lat: 13.288378, lon: 100.924359 }];

//     const facilities = resId.map((item, index) => ({
//       name: String(item.id ?? `facility${index}`),
//       lat: Number(item.lat),
//       lon: Number(item.lon),
//     }));

//     const params = {
//       key: process.env.NOSTRAMAP_API_KEY,
//       incident: JSON.stringify(incident),
//       facilities: JSON.stringify(facilities),
//       mode: "Car",
//       impedance: "Time",
//       targetFacilityCount: facilities.length,
//       language: "L",
//       directionLanguage: "English",
//       cutOff: 60,
//       returnedAGSResult: "True",
//       outSR: 4326,
//     };

//     console.log("🚀 ส่ง params ไป Nostramap:", params);

//     // ใช้ qs.stringify เพื่อแปลงเป็น form-urlencoded
//     const response = await axios.post(url, qs.stringify(params), {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("❌ เกิดข้อผิดพลาดในการเรียกใช้งาน API:", error.response?.data || error.message);
//     throw error;
//   }
// };

const getClosestFacility = async (params) => {
  try {
    //  ส่ง params ตรง ๆ ให้ axios encode
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error.response?.status, error.response?.data || error.message);
    throw error;
  }
};

module.exports = { getClosestFacility }