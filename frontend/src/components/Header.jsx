import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav className="logo">
        <h1>GreencycleHuB</h1>
      </nav>
      <nav className="nav-links">
        <Link to="/login">
          <button className="btn-login">เข้าสู่ระบบ</button>
        </Link>
        <Link to="/register">
          <button className="btn-regis">ลงทะเบียน</button>
        </Link>
      </nav>
    </header>
  );
}
