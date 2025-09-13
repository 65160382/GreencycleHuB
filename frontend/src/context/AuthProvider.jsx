import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";

// สร้าง component provider
export const AuthProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(""); // เก็บข้อมูล user เช่น req.user
  const [isLoggedIn, setIsLoggedIn] = useState(false); // สถานะ login
  const [isAuthChecked, setIsAuthChecked] = useState(false); //เช็คเสร็จแล้วหรือยัง

  useEffect(() => {
    // ทำการตรวจสอบการล็อกอินเพียงครั้งเดียวเมื่อ component ถูก mount
    const verifyUser = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/auth`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUser(data.user);
          console.log("เข้าสู่ระบบแล้ว");
        } else if (response.status === 401 || response.status === 403) {
          // ถ้า token หมดอายุ ลอง refresh
          console.log("Token หมดอายุ, กำลังลองต่ออายุ...");
          const refreshed = await refreshToken();
          if (!refreshed) {
            // ถ้า refresh ไม่สำเร็จ
            setIsLoggedIn(false);
            setUser("");
            console.log("ยังไม่เข้าสู่ระบบ");
          }
        } else {
          setIsLoggedIn(false);
          setUser("");
          console.log("ยังไม่เข้าสู่ระบบ");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์!", error);
        setIsLoggedIn(false);
        setUser("");
      } finally {
        setIsAuthChecked(true);
      }
    };

    verifyUser();
  }, []); // ใช้ dependency array ว่างเพื่อให้ useEffect ทำงานครั้งเดียว

  // http://localhost:3000/api/auth/refresh เรียกใช้ api เพื่อต่ออายุ token
  const refreshToken = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        console.log("ต่ออายุ Token สำเร็จ, กำลังดึงข้อมูลผู้ใช้ใหม่...");
        // หลังจาก refresh token สำเร็จ ให้ดึงข้อมูล user อีกครั้ง
        const userRes = await fetch(`${apiUrl}/api/auth`, {
          method: "GET",
          credentials: "include",
        });
        if (userRes.ok) {
          const data = await userRes.json();
          setIsLoggedIn(true);
          setUser(data.user);
          return true; // คืนค่าว่า refresh สำเร็จ
        }
      }
      return false; // คืนค่าว่า refresh ไม่สำเร็จ
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการต่ออายุ Token!", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, isAuthChecked }}
    >
      {children}
    </AuthContext.Provider>
  );
};