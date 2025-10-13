// Sidebar.jsx
import { Link,useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(AuthContext);

  // ฟังก์ชั่นสำหรับออกจากระบบ http://localhost:3000/api/auth/logout
  const handlelogout = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/logout`,{
        method:"POST",
        credentials: "include", // เพื่อให้ cookie ถูกส่งไปกับคำขอ
      })
      if(response.ok){
        setUser(""); // ล้างค่า Context
        setIsLoggedIn(false);
        const result = await response.json();
        console.log(result.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการออกจากระบบ:", error);
    }
  }

  return (
    <>
      {isOpen && (
        // Overlay
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 z-50 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-xl font-semibold">เมนู</h2>
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Body */}
        <nav className="flex-grow flex flex-col gap-4 p-4">
          <Link to="/home" className="text-gray-700 hover:text-green-600 transittion-all duration-300 hover:translate-x-2">
            หน้าแรก
          </Link>
          {/* <Link to="#" className="text-gray-700 hover:text-green-600 transittion-all duration-300 hover:translate-x-2">
            สแกนขยะ
          </Link> */}
          <Link to="/reserve" className="text-gray-700 hover:text-green-600 transittion-all duration-300 hover:translate-x-2">
            จองคิวรับซื้อขยะ
          </Link>
          <Link to="/status" className="text-gray-700 hover:text-green-600 transittion-all duration-300 hover:translate-x-2">
            รายการจองของฉัน
          </Link>
          {/* <Link to="#" className="text-gray-700 hover:text-green-600 transittion-all duration-300 hover:translate-x-2">ประวัติการสแกนขยะ</Link> */}
          {/* <Link to="#" className="text-gray-700 hover:text-green-600 transittion-all duration-300 hover:translate-x-2">โปรไฟล์</Link> */}
          <Link to="/logout" onClick={handlelogout} className="text-gray-700 hover:text-green-600 transittion-all duration-300 hover:translate-x-2">ออกจากระบบ</Link>

        </nav>

        {/* Footer */}
        <div className="p-4 border-t font-semibold text-lg">
          <p>GreencycleHuB</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
