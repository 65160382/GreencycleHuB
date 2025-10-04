import { useCallback, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, UserRound, Car, Home, ListTodo, History, FileText } from "lucide-react";
// ลองปรับให้ component มัน dynamic
import { AuthContext } from "../../context/AuthContext";

const navItems = {
  admin: [
    { icon: <LayoutDashboard size={18} />, name: "Dashboard", path: "/admin" },
    { icon: <Calendar size={18} />, name: "Booking", path: "/admin/booking" },
    { icon: <Car size={18} />, name: "Driver", path: "#" },
    { icon: <UserRound size={18} />, name: "Customer", path: "#" },
  ],
  driver: [
    { icon: <Home size={18} />, name: "Home", path: "/driver" },
    { icon: <ListTodo size={18}/>, name: "My Tasks", path: "/driver/tasks" },
    { icon: <History size={18}/>, name: "History", path: "/driver/history" },
    { icon: <FileText size={18}/>, name: "Report", path: "/driver/report" },
  ],
};

const SidebarAdmin = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  //ตรวจสอบ role แล้วแสดง menu ตาม role
  const menu = navItems[user?.role] || [];

  return (
    <aside className="w-[250px] min-h-screen bg-gray-900 text-white p-4">
      <div className="mb-8 ">
        <h1 className="text-xl font-semibold">GreencycleHuB</h1>
        <p className="text-sm text-gray-300">{user.role} Panel</p>
      </div>

      <nav className="">
        <ul className="space-y-3">
          <p className="text-gray-300 text-sm">Menu</p>
          {menu.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 transition-all ${
                  isActive(item.path) ? "bg-gray-800 font-semibold" : ""
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
