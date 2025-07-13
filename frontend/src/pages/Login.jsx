import LoginForm from "../components/Loginpage/LoginForm";
import "../components/Loginpage/Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({setIsLoggedIn}) => {
  // สร้าง state เพื่อเก็บข้อมูล
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  // เรียกใช้ hook navigate สำหรับเปลี่ยนการแสดงผลของหน้าจอ 
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
     const response = await fetch('http://localhost:3000/api/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // ส่ง cookies ไปด้วย
      body: JSON.stringify({email: email,password: password}),
     });

     if(response.ok){
      // รอให้ response จาก fetch() ถูกแปลงจาก JSON string เป็น JavaScript object แล้วเก็บไว้ในตัวแปร data”
      const data = await response.json();
      setIsLoggedIn(true) // อัปเดตสถานะทันทีหลัง login
      navigate("/home",{data});
     }else{
      // handleError();
      // ดึงข้อความ error message ที่ส่งมาจาก api
      const errorData = await response.json(); 
      console.log(errorData.message);
      setError(errorData.message);
     }
    } catch (error) {
      console.error('เกิดข้อผิดพลาด',error)
    }
  }

  return (
    <div className="container">
      <div className="login-content">
        <div className="login-title">
          <h1>GreencycleHub</h1>
          <p>Login</p>
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
        <div className="register-link">
          <p>หากยังไม่มีบัญชี </p>
          <Link to={"/register"}>ลงทะเบียนเข้าสู่ระบบ</Link>
        </div>
      </div>
      <div className="picture-login">
        <img src="Login-recycle-collecting.jpg" alt="login-picture"></img>
      </div>
    </div>
  );
};

export default Login;
