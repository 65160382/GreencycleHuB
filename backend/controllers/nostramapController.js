const axios = require("axios");
const { fetchClosetFacility } = require("../utils/nostramapUtils");
require("dotenv").config();

exports.getClosetFacility = async (req, res) => {
  try {
    const { resId } = req.body;
    // console.log("debug resid:",resId)
    const url = "https://api.nostramap.com/Service/V2/Network/ClosestFacility";

    incident = [{ name: "Company", lat: 13.288378, lon: 100.924359 }]
    // facilities = [
    //   { name: "sevenEleven1", lat: 13.286474, lon: 100.925759 },
    //   { name: "sevenEleven2", lat: 13.2887, lon: 100.926896 },
    //   { name: "sevenEleven3", lat: 13.287216, lon: 100.930106 },
    //   { name: "sevenEleven4", lat: 13.285968, lon: 100.923165 }
    // ]
    const facilities = resId.map((item, index) => ({
      name: String(item.id),
      lat: Number(item.lat),
      lon: Number(item.lon),
    }));

    // console.log("debug facilities:",facilities);

    const params = {
      key: process.env.NOSTRAMAP_API_KEY,
      incident: JSON.stringify(incident),
      facilities: JSON.stringify(facilities),
      mode: "Car",
      impedance: "Time",
      targetFacilityCount: facilities.length,
      language: "L",
      directionLanguage: "English",
      // cutOff: 60, 
      returnedAGSResult: "True",
      outSR: 4326,
    };

    // console.log("debug length:",params.targetFacilityCount);

    const response = await axios.get(url, { params: params });
    // const response = await fetchClosetFacility(params);
    // console.log("test response:",response);
    if (response) {
      // console.log("debug data:", response);
      const results = response.data.results;
      // ตัด Object json data ของ api
      const nostraResults = results.routes.features.map((item) => ({

        facilityName: item.attributes.Name,
        facilityRank: item.attributes.FacilityRank,
        totalTime: item.attributes.Total_TravelTime,
        totalLength: item.attributes.Total_Kilometers * 1000, // แปลงเป็นเมตร
      }));

      // console.log("debug data after:",nostraResults);

      // map ค่าใหม่เอา id ของการจองแปะไปใน data ที่จะส่งให้ frontend ด้วย
      const mapped = nostraResults.map(item => {
        const id = item.facilityName.replace("Company - ","")//ตัดคำออกไปเหลือแต่ไอดี
        return {
          res_id:Number(id), //เก็บเป็น resId แทน
          ...item
        }
      })
      // console.log("debug new value:",mapped);
      return res.status(200).json({ data: mapped, message: "เรียกข้อมูลสำเร็จ!"})
    } else {
      console.log("ไม่มีผลลัพธ์จาก api!");
      return res.json({message: "เกิดข้อผิดพลาดไม่สามารถเรียกใช้งานได้"})
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเรียกใช้งาน API", error);
  }
};

exports.getRoute = async (req, res) => {
  try {
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเรียกใช้งาน API", error);
  }
};
