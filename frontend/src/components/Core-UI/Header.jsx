import "./Header.css";
import { Link } from "react-router-dom";

export default function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <nav className="logo">
        <h1>GreencycleHuB</h1>
      </nav>

      <nav className="nav-links">
        {isLoggedIn ? ( // ternary option ถ้าเป็นจริงทำงานหลัง ?
          <>
            <Link to="/home">
              <button className="">หน้าหลัก</button>
            </Link>
            <Link to="">
              <button className="">จองคิวรับซื้อขยะ</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn-login">เข้าสู่ระบบ</button>
            </Link>
            <Link to="/register">
              <button className="btn-regis">ลงทะเบียน</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
