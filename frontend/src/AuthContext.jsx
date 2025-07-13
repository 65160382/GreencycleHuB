// // AuthContext.js - ง่ายๆ ใช้ fetch
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ตรวจสอบว่าผู้ใช้ login อยู่หรือไม่เมื่อเริ่มต้น
//   useEffect(() => {
//     checkUser();
//   }, []);

//   // ฟังก์ชั่นตรวจสอบผู้ใช้
//   const checkUser = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/", {
//         credentials: "include", // ส่ง cookie ไปด้วย
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.isAuth) {
//           setUser(data.user);
//         }
//       }
//     } catch (error) {
//       console.log("ตรวจสอบผู้ใช้ไม่ได้:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ฟังก์ชั่น login
//   const login = async (email, password) => {
//     try {
//       const response = await fetch("http://localhost:3001/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // ส่ง cookie ไปด้วย
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok && data.isAuth) {
//         setUser(data.user);
//         return { success: true, message: data.message };
//       } else {
//         return { success: false, error: data.message };
//       }
//     } catch (error) {
//       return { message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ", error };
//     }
//   };

//   // ฟังก์ชั่น logout
//   const logout = async () => {
//     try {
//       await fetch("http://localhost:3001/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//       setUser(null);
//     } catch (error) {
//       console.log("Logout error:", error);
//       setUser(null); // ให้ logout ใน frontend ต่อไป
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         loading,
//         isLoggedIn: !!user, // ถ้า user มีค่า = true, ถ้าไม่มี = false
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
