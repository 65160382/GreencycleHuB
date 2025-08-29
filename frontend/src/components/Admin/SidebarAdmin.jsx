import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, UserRound, Car } from "lucide-react";

const navItems = [
  { icon: <LayoutDashboard size={18} />, name: "Dashboard", path: "/admin" },
  { icon: <Calendar size={18} />, name: "Booking", path: "/admin/booking" },
  { icon: <Car size={18} />, name: "Driver", path: "#" },
  { icon: <UserRound size={18} />, name: "Customer", path: "#" },
];

const SidebarAdmin = () => {
  const location = useLocation();
  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  return (
    <aside className="w-[250px] min-h-screen bg-gray-900 text-white p-4">
      <div className="mb-8 ">
        <h1 className="text-xl font-semibold">GreencycleHuB</h1>
        <p className="text-sm text-gray-300">Admin Panel</p>
      </div>

      <nav className="">
        <ul className="space-y-3">
          <p className="text-gray-300 text-sm">Menu</p>
          {navItems.map((item) => (
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
