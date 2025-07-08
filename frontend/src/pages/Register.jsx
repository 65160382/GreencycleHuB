import RegisterForm from "../components/Registerpage/RegisterForm";
import '../components/Registerpage/Register.css'

export default function RegisterPage() {
  return (
    <div className="container">
      <div className="register-content">
        <div className="register-title">
          <h1>GreencycleHub</h1>
        </div>
        <RegisterForm/>
        <div className="login-link">
          <p>มีบัญชีผู้ใช้อยู่แล้ว </p>
          <a href="#">เข้าสู่ระบบ</a>
        </div>
      </div>
      <div className="picture-register">
        <img src="register-recycle-waste.jpg" alt="login-picture"></img>
      </div>
    </div>
  );
}
