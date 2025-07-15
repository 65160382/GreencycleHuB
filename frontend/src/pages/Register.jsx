import RegisterForm from "../components/Registerpage/RegisterForm";
// import "../components/Registerpage/Register.css";
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
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-5 gap-8">
      <div className="p-6 rounded-xl w-full max-w-md">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold">GreencycleHub</h1>
          <p className="text-base">Register</p>
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
        <div className="flex justify-center mt-5 gap-2 text-sm">
          <p >มีบัญชีผู้ใช้อยู่แล้ว </p>
          <Link to={"/login"} className="text-blue-500 hover:underline">เข้าสู่ระบบ</Link>
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center p-2">
        <img src="register-recycle-waste.jpg" alt="register-picture" className="w-[300px] lg:w-[350px] h-auto object-contain rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"></img>
      </div>
    </div>
  );
};

export default Register;
