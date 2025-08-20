import { Link } from "react-router-dom";

const Navlinks = () => {
  const baseClass = "text-gray-700 hover:text-green-600 transition-colors font-medium";

  return (
    <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-8  ">
      <Link to="/home" className={baseClass}>
        หน้าหลัก
      </Link>
      <Link to="#" className={baseClass}>
        สแกนขยะ
      </Link>
      <Link to="/reserve" className={baseClass}>
        จองคิวรับซื้อขยะ
      </Link>
      <Link to="/status" className={baseClass}>
        รายการจองของฉัน
      </Link>
    </nav>
  );
};

export default Navlinks;
