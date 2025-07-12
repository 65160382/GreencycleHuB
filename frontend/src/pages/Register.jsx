import RegisterForm from "../components/Registerpage/RegisterForm";
import "../components/Registerpage/Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();

  // จัดการบันทึกข้อมูลเมื่อส่ง form
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: 'include', // ส่ง cookies ไปด้วย
        body: JSON.stringify({
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/home");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด", error);
    }
  };

  return (
    <div className="container">
      <div className="register-content">
        <div className="register-title">
          <h1>GreencycleHub</h1>
          <p>Register</p>
        </div>
        <RegisterForm
          email={email}
          password={password}
          firstname={firstname}
          lastname={lastname}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onFirstnameChange={setFirstname}
          onLastnameChange={setLastname}
          onSubmit={handleRegister}
        />
        <div className="login-link">
          <p>มีบัญชีผู้ใช้อยู่แล้ว </p>
          <Link to={"/login"}>เข้าสู่ระบบ</Link>
        </div>
      </div>
      <div className="picture-register">
        <img src="register-recycle-waste.jpg" alt="login-picture"></img>
      </div>
    </div>
  );
};

export default Register;
