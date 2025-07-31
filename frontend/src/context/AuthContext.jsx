import { createContext, useState, useEffect } from "react";

// สร้าง context ตัวหลัก
export const AuthContext = createContext();

// สร้าง component provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(""); // เก็บข้อมูล user เช่น req.user
  const [isLoggedIn, setIsLoggedIn] = useState(false); // สถานะ login

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
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ส่ง cookies ไปด้วย
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        // console.log("data:",data)
        setUser(data.user)
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};


