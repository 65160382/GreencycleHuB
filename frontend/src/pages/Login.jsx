import LoginForm from "../components/Loginpage/LoginForm";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  // สร้าง state เพื่อเก็บข้อมูล
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  // เรียกใช้ hook navigate สำหรับเปลี่ยนการแสดงผลของหน้าจอ
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ส่ง cookies ไปด้วย
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.ok) {
        // รอให้ response จาก fetch() ถูกแปลงจาก JSON string เป็น JavaScript object แล้วเก็บไว้ในตัวแปร data”
        const data = await response.json();
        setIsLoggedIn(true); // อัปเดตสถานะทันทีหลัง login
        setUser(data.payload);

        // if (data.payload.role == "admin") {
        //   navigate("/admin");
        // } else {
        //   navigate("/home");
        // }
        if (data.payload.role == "admin") {
          navigate("/admin");
        } else if(data.payload.role == "driver"){
          navigate("/driver");
        } else {
          navigate("/home");
        }

        console.log(data);
      } else {
        // ดึงข้อความ error message ที่ส่งมาจาก api
        const errorData = await response.json();
        console.log(errorData.message);
        setError(errorData.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-5 gap-8">
      {/* เนื้อหา Login */}
      <div className="p-6 rounded-xl w-full max-w-md">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold">GreencycleHub</h1>
          <p className="text-base">Login</p>
        </div>
        {/* ส่ง Props ไปยัง component ย่อยของ login */}
        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail} // ส่งฟังก์ชันเปลี่ยนค่า
          onPasswordChange={setPassword} // ส่งฟังก์ชันเปลี่ยนค่า
          onSubmit={handleLogin}
          error={error}
        />
        <div className="flex justify-center mt-5 gap-2 text-sm">
          <p>หากยังไม่มีบัญชี </p>
          <Link to={"/register"} className="text-blue-500 hover:underline">
            ลงทะเบียนเข้าสู่ระบบ
          </Link>
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center p-2">
        <img
          src="Login-recycle-collecting.jpg"
          alt="login-picture"
          className="w-[300px] lg:w-[350px] h-auto object-contain rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
        ></img>
      </div>
    </div>
  );
};

export default Login;
