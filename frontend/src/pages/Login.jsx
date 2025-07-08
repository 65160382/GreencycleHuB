import LoginForm from "../components/Loginpage/LoginForm";
import SociaclLogin from "../components/Loginpage/SocialLogin";
import '../components/Loginpage/Login.css'

export default function Login() {
  return (
    <div className="container">
      <div className="login-content">
        <div className="login-title">
          <h1>GreencycleHub</h1>
        </div>
        <LoginForm/>
        <SociaclLogin/>
        <div className="register-link">
          <p>หากยังไม่มีบัญชี </p>
          <a href="#">ลงทะเบียนเข้าสู่ระบบ</a>
        </div>
      </div>
      <div className="picture-login">
        <img src="Login-recycle-collecting.jpg" alt="login-picture"></img>
      </div>
    </div>
  );
}
