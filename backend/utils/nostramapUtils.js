const axios = require("axios");
require("dotenv").config();
const BASE_URL = "https://api.nostramap.com/Service/V2/Network/ClosestFacility";

exports.normalizeLocation = (obj) => {
  // บริษัท
  if (obj.name === "Company") {
    return {
      name: "Company",
      lat: parseFloat(obj.lat),
      lon: parseFloat(obj.lon),
    };
  }

  // บ้าน
  return {
    name: String(obj.res_id),
    lat: parseFloat(obj.add_lat),
    lon: parseFloat(obj.add_lon),
  };
}