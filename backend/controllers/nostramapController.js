const axios = require("axios");
require("dotenv").config();

// version nostramap api
exports.getClosetFacility = async (req, res) => {
  try {
    const { resId } = req.body;
    console.log("debug resid:",resId);
    const url = "https://api.nostramap.com/Service/V2/Network/ClosestFacility";

    incident = [{ name: "Company", lat: 13.288378, lon: 100.924359 }];
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
      const mapped = nostraResults.map((item) => {
        const id = item.facilityName.replace("Company - ", ""); //ตัดคำออกไปเหลือแต่ไอดี
        return {
          res_id: Number(id), //เก็บเป็น resId แทน
          ...item,
        };
      });
      // console.log("debug new value:",mapped);
      return res
        .status(200)
        .json({ data: mapped, message: "เรียกข้อมูลสำเร็จ!" });
    } else {
      console.log("ไม่มีผลลัพธ์จาก api!");
      return res.json({ message: "เกิดข้อผิดพลาดไม่สามารถเรียกใช้งานได้" });
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเรียกใช้งาน API", error);
  }
};

// คำนวณเส้นทางการเดินรถไปยังตำแหน่งต่างๆตามลำดับที่วางเอาไว้
// exports.getRoute = async (req, res) => {
//   // รับข้อมูลที่อยู่ต่างๆของลูกค้าตามลำดับจาก react
//   let { from, to } = req.body;
//   // console.log("debug from ",from," to ",to);

//   // สร้าง object ใหม่ที่ตรงตาม pattern nostramaps
//    from = normalizeLocation(from);
//    to = normalizeLocation(to);

//   // ต้อง push จุดเริ่มต้นและจุดสิ้นสุดไปในตัวแรกและตัวสุดท้ายด้วยรวมเป็น array
//   const stops = [from, to];
//   // console.log("debug stops:", stops);
//   const url = process.env.NOSTRAMAP_ROUTE_URL;

//   const data = {
//     key: process.env.NOSTRAMAP_API_KEY,
//     stops: JSON.stringify(stops),
//     mode: "Car",
//     impedance: "Distance",
//     returnedRouteDetail: "True", //รายละเอียดเส้นทางทั้งหมด
//     findBestSequence: "True",
//     preserveFirstStop: "True", //บังคับให้จุดแรกต้องเริ่มที่ stop[0]
//   };

//   try {
//     const response = await axios.get(url, { params: data });
//     const results = response.data.results;
//     // console.log("debug results", results);
//     // const routedata = {
//     //   totalLength:results.totalLength,
//     //   totalTime:results.totalTime,
//     //   geometry:results.route
//     // }
//     // res.status(200).json({ message: "คำนวณเส้นทางสำเร็จ!",routedata });
//     res.status(200).json({ message: "คำนวณเส้นทางสำเร็จ!",results });
//   } catch (error) {
//     console.error("เกิดข้อผิดพลาดในการเรียกใช้งาน API", error);
//   }
// };

// version openrouteservice
exports.getOptimizedOrder = async (req, res) => {
  try {
    const { resId } = req.body;
    // console.log("debug resId:", resId);

    if (!Array.isArray(resId) || resId.length === 0) {
      return res.status(400).json({ message: "resId is required" });
    }


    const depotLat = parseFloat(process.env.DEPOT_LAT);
    const depotLon = parseFloat(process.env.DEPOT_LON);

    //แปลงรายการจองเป็น parameter jobs เพื่อเรียกใช้ service optimizedOrder
    const jobs = resId.map((r) => ({
      id: Number(r.id),
      location: [parseFloat(r.lon), parseFloat(r.lat)], // [lon, lat]
    }));

    // กำหนดยานพาหนะ
    const vehicles = [
      {
        id: 1,
        profile: "driving-car", // ต้องใส่ตรงนี้ ไม่ใช่ใน query string
        start: [depotLon, depotLat],
        end: [depotLon, depotLat], // จะให้กลับบริษัทหรือไม่ก็ได้
      },
    ];

    // const orsUrl = "https://api.openrouteservice.org/optimization"; 
    const orsUrl = process.env.ORS_OPTIMIZATION_URL; 
    const response = await axios.post(
      orsUrl,
      { jobs, vehicles },
      {
        headers: {
          Authorization: process.env.ORS_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    const steps = response.data?.routes?.[0]?.steps || []; //หยิบลำดับจาก routes[0].steps
    const ordered = steps
      .filter((s) => typeof s.job === "number") //กรองออกเฉพาะ step ที่เป็น “จุดลูกค้า (job)” เท่านั้น
      //ตัด step ที่เป็น "start" หรือ "end" ทิ้ง เพราะไม่ใช่งานจริง
      .map((s, i) => ({ //แปลงแต่ละ step ให้เป็น object
        res_id: s.job,
        facilityRank: i + 1,
        // totalLength: null,
        // totalTime: null,
      }));

    return res.status(200).json({ message: "คำนวณลำดับเส้นทางแบบ Optimization สำเร็จ",data: ordered});
  } catch (err) {
    console.error("ORS Optimization error:",err?.response?.data || err.message || err);
    return res.status(500).json({ message: "ไม่สามารถคำนวณลำดับเส้นทางแบบ optimization ได้" });
  }
};

// ORS Directions: วาดเส้นทาง polyline จากจุดเริ่ม -> จุดปลาย 
exports.getRoute = async (req, res) => {
  try {
    // const { waypoints, from, to } = req.body;
    const { waypoints } = req.body;
    // console.log("check reqbody:",waypoints," from:",from," to:",to)

    // เตรียมพิกัด [lon, lat] 
    let coords = [];
    // if (Array.isArray(waypoints) && waypoints.length >= 2) {
    //   coords = waypoints.map((p) => [parseFloat(p.lon), parseFloat(p.lat)]);
    // } else if (from && to) {
    //   coords = [
    //     [parseFloat(from.lon), parseFloat(from.lat)],
    //     [parseFloat(to.lon), parseFloat(to.lat)],
    //   ];
    // } else {
    //   return res.status(400).json({ message: "ต้องส่ง waypoints >= 2 จุด หรือ from/to" });
    // }
    //แปลงค่าที่รับมาจาก React ให้กลายเป็นลิสต์ coords ที่ ORS เข้าใจ
    if (Array.isArray(waypoints) && waypoints.length >= 2) {
      coords = waypoints.map((p) => [parseFloat(p.lon), parseFloat(p.lat)]);
    } else {
      return res.status(400).json({ message: "ต้องส่ง waypoints เพื่อคำนวณเส้นทาง" });
    }

    // เรียก ORS Directions (GeoJSON) 
    // const url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";
    const url = process.env.ORS_DIRECTIONS_URL;

    const orsRes = await axios.post(
      url,
      {
        coordinates: coords,       // [[lon,lat], [lon,lat], ...] ลำดับตามที่ส่งมา
        instructions: false,       // ไม่ต้องเอาคำสั่งเลี้ยว (ถ้าจะใช้เปิดเป็น true ได้)
        elevation: false,
      },
      {
        headers: {
          Authorization: process.env.ORS_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    //แปลงผลลัพธ์เป็น polyline สำหรับ Leaflet 
    const feature = orsRes.data?.features?.[0];
    if (!feature) {
      return res.status(500).json({ message: "ไม่มีเส้นทางจาก ORS" });
    }

    const line = feature.geometry?.coordinates || []; // [ [lon,lat], ... ]
    const polyline = line.map(([lon, lat]) => [lat, lon]); // แปลงเป็น [lat,lon] สำหรับ Leaflet

    const summary = feature.properties?.summary || {}; // {distance (m), duration (s)}

    return res.status(200).json({
      message: "คำนวณเส้นทางสำเร็จ!",
      route: {
        polyline, // [[lat,lon], ...] 
        distance: summary.distance ?? null,  // เมตร
        duration: summary.duration ?? null,  // วินาที
      },
    });
  } catch (err) {
    console.error("ORS Directions error:", err?.response?.data || err.message || err);
    return res.status(500).json({ message: "ไม่สามารถคำนวณเส้นทางได้" });
  }
};



