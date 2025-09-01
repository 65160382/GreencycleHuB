import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser, setIsLoggedIn } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // http://localhost:3000/api/auth/logout
  const handlelogout = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      if(response.ok){
        setUser(""); // ล้างค่า Context
        setIsLoggedIn(false);
        const result = await response.json();
        console.log(result.message);
        navigate("/login");
      }
    } catch (error) {
      console.log("เกิดข้อผิดพลาดในการจัดการเซิรฟ์เวอร์!", error);
    }
  };

  return (
    <div className="relative ml-auto">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/profile.png" alt="User" />
        </span>

        <span className="block mr-1 font-medium text-sm">admin</span>
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[260px] rounded-xl border border-gray-200 bg-white p-3 shadow-lg z-50">
          <div className="mb-2">
            <span className="block font-medium text-gray-700 text-sm">
              admin
            </span>
            <span className="block text-xs text-gray-500">
              {user.email}
            </span>
          </div>

          <ul className="flex flex-col gap-1 pt-4 pb-3 border-t border-gray-100">
            <li>
              <Link
                to="/profile"
                onClick={closeDropdown}
                className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100"
              >
                Edit profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                onClick={closeDropdown}
                className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100"
              >
                Account settings
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                onClick={closeDropdown}
                className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100"
              >
                Support
              </Link>
            </li>
          </ul>

          <Link
            to="/logout"
            onClick={handlelogout}
            className="block px-3 py-2 rounded-md text-sm text-red-500 hover:bg-gray-100"
          >
            Sign out
          </Link>
        </div>
      )}
    </div>
  );
}
