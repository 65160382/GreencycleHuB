import { Link } from "react-router-dom";

const Navlinks = () => {
  const baseClass = "text-gray-700 hover:text-green-600 transition-colors font-medium";

  return (
    <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
      <Link to="/home" className={baseClass}>
        หน้าหลัก
      </Link>
      <Link to="#" className={baseClass}>
        สแกนขยะ
      </Link>
      <Link to="/reserve" className={baseClass}>
        จองคิวรับซื้อขยะ
      </Link>
      <Link to="#" className={baseClass}>
        ติดตามสถานะ
      </Link>
    </nav>
  );
};

export default Navlinks;
