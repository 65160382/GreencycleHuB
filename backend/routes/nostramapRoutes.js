const express = require("express");
const NostramapController = require("../controllers/nostramapController")
// const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// const NOSTRAMAP_API_KEY = process.env.NOSTRAMAP_API_KEY;

// router.get("/closest-facility", async (req, res) => {

//   const url = "https://api.nostramap.com/Service/V2/Network/ClosestFacility";

//   const mockdata = {
//     key: NOSTRAMAP_API_KEY, // ส่ง key เป็น param
//     facilities: JSON.stringify([
//       { name: "sevenEleven1", lat: 13.286474, lon: 100.925759 },
//       { name: "sevenEleven2", lat: 13.2887, lon: 100.926896 },
//       { name: "sevenEleven3", lat: 13.287216, lon: 100.930106 },
//       { name: "sevenEleven4", lat: 13.285968, lon: 100.923165 },
//     ]),
//     incident: JSON.stringify([
//       { name: "Incident", lat: 13.288378, lon: 100.924359 },
//     ]),
//     mode: "Car",
//     impedance: "Time",
//     language: "L",
//     directionLanguage: "English",
//     cutOff: 60,
//     returnedAGSResult: "True",
//     outSR: 4326,
//   };

//   try {
//     const response = await axios.get(url, { params: mockdata });
//     // console.log("ทดสอบ url query!",`${url}?${qs}`);
//     const results = response.data.results;

//     // แปลงรูปแบบผลลัพธ์เฉพาะเอาส่วนที่ต้องการ
//     const nostraResults = results.routes.features.map((item) => ({
//       facilityName: item.attributes.Name,
//       facilityRank: item.attributes.FacilityRank,
//       totalTime: item.attributes.Total_TravelTime,
//       totalLength: item.attributes.Total_Kilometers * 1000, // แปลงเป็นเมตร
//       // useTollRoad: item.attributes.UseTollRoad || false,
//     }));

//     console.log("ทดสอบ debug result", nostraResults);
//     // return res.json(results)
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// });

// router.get("/closest-facility",NostramapController.getClosetFacility);

// router.post("/closest-facility",NostramapController.getClosetFacility);

router.post("/closest-facility",NostramapController.getOptimizedOrder);
// test endpoint
router.post("/route",NostramapController.getRoute)

// router.get("/route", async (req, res) => {
//   const url = "https://api.nostramap.com/service/v2/Network/Route";

//   const data = {
//     key: NOSTRAMAP_API_KEY, // ✅ ส่ง key เป็น param
//     stops: JSON.stringify([
//       { name: "sevenEleven2", lat: 13.2887, lon: 100.926896 },
//       { name: "sevenEleven1", lat: 13.286474, lon: 100.925759 }
//     ]),
//     mode: "Car",
//     impedance: "Distance",
//     returnedRouteDetail: "True", //รายละเอียดเส้นทางทั้งหมด
//     findBestSequence: "True",
//     preserveFirstStop: "True" //บังคับให้จุดแรกต้องเริ่มที่ stop[0]
//   };

//   try {
//     const response = await axios.get(url, { params: data });
//     const results = response.data.results;

//     console.log("debug result", results);
//     res.json(results);
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// });


module.exports = router;
