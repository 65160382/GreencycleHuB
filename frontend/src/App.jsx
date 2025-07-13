import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Guest from "./pages/Guest";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLogin();
    if (isLoggedIn) {
      console.log("เข้าสู่ระบบแล้ว");
    } else {
      console.log("ยังไม่เข้าสู่ระบบ");
    }
  }, [isLoggedIn]);

  //http://localhost:3000/api/auth เรียกใช้ api ในการตรวจสอบว่าผู้ใข้ login หรือยัง
  const checkLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ส่ง cookies ไปด้วย
      });
      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!", error);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Guest />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home isLoggedIn={isLoggedIn}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
