import LoginForm from "../components/LoginForm";
import SociaclLogin from "../components/SocialLogin";
import '../components/Login.css'

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
        </div>
      </div>
      <div className="picture-login">
        <img src="Login-recycle-collecting.jpg" alt="login-picture"></img>
      </div>
    </div>
  );
}
