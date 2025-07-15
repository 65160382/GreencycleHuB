import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import Navlinks from "./Navlinks";

export default function Header({ isLoggedIn }) {
  return (
    <header className="flex justify-between items-center p-5 w-auto bg-white border-b border-gray-200
">
      {/* Logo - อยู่ซ้ายเสมอ */}
      <nav className="logo">
        <h1 className="text-2xl font-bold">GreencycleHuB</h1>
      </nav>

      {/* Navigation Links - เมื่อ login แล้วจะอยู่ตรงกลาง */}
      {isLoggedIn && (
        <Navlinks/>
      )}

      {/* Right Section - Buttons หรือ User Menu */}
      <nav className="nav-links">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <IoSearchOutline  className="w-6 h-6"/>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <IoIosMenu className="w-7 h-7"/>
            </button>
          </div>
        ) : (
          <div className="flex gap-2 ">
            <Link to="/login">
              <button className="p-2.5 bg-[#b9ff66] rounded-lg cursor-pointer shadow-md hover:bg-[#a8ee55] transition-colors">
                เข้าสู่ระบบ
              </button>
            </Link>
            <Link to="/register">
              <button className="p-2.5  bg-[#f3f3f3] rounded-lg cursor-pointer shadow-md hover:bg-[#e8e8e8] transition-colors">
                ลงทะเบียน
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
