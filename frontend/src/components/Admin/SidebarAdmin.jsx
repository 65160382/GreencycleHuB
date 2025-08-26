// ✅ Sidebar (JS + ใช้ icon จาก lucide-react)
import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, UserCircle } from "lucide-react";

const navItems = [
  { icon: <LayoutDashboard size={18} />, name: "Dashboard", path: "#" },
  { icon: <Calendar size={18} />, name: "Calendar", path: "#" },
  { icon: <UserCircle size={18} />, name: "User Profile", path: "#" },
];

const SidebarAdmin = () => {
  const location = useLocation();
  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  return (
    <aside className="w-[250px] min-h-screen bg-gray-900 text-white p-4">
      <div className="mb-8">
        <Link to="#">
          <h1 className="text-xl font-semibold">GreencycleHuB</h1>
        </Link>
      </div>

      <nav>
        <ul className="space-y-3">
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
