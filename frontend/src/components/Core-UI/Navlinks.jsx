import { Link } from "react-router-dom";
const Navlinks = () => {
  return (
    <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
      <Link
        to={"/home"}
        className="text-gray-700 hover:text-green-600 transition-colors font-medium"
      >
        หน้าหลัก
      </Link>
      <Link
        to="#"
        className="text-gray-700 hover:text-green-600 transition-colors font-medium"
      >
        สแกนขยะ
      </Link>
      <Link
        to="#"
        className="text-gray-700 hover:text-green-600 transition-colors font-medium"
      >
        จองคิวรับซื้อขยะ
      </Link>
      <Link
        to=""
        className="text-gray-700 hover:text-green-600 transition-colors font-medium"
      >
        ติดตามสถานะ
      </Link>
    </nav>
  );
};

export default Navlinks;
