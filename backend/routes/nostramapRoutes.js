const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const NOSTRAMAP_API_KEY = process.env.NOSTRAMAP_API_KEY;

router.get("/closest-facility", async (req, res) => {
  const url = "https://api.nostramap.com/Service/V2/Network/ClosestFacility";

  const mockdata = {
    key: NOSTRAMAP_API_KEY, // ส่ง key เป็น param
    incident: JSON.stringify([
      { name: "Incident", lat: 13.288378, lon: 100.924359 },
    ]),
    facilities: JSON.stringify([
      { name: "sevenEleven1", lat: 13.286474, lon: 100.925759 },
      { name: "sevenEleven2", lat: 13.2887, lon: 100.926896 },
      { name: "sevenEleven3", lat: 13.287216, lon: 100.930106 },
      { name: "sevenEleven4", lat: 13.285968, lon: 100.923165 },
    ]),
    mode: "Car",
    impedance: "Time",
    tollroad: "True",
    targetFacilityCount: 3,
    language: "L",
    directionLanguage: "English",
    cutOff: 60,
    returnedAGSResult: "True",
    outSR: 4326,
  };

  try {
    const response = await axios.get(url, { params: mockdata });

    console.log("ทดสอบสำเร็จ!");
    console.dir(response.data, { depth: null });
    return res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
});

module.exports = router;
