import { useEffect, useRef } from "react";
import { Menu, Search } from "lucide-react";
import UserDropdown from "../Admin/UserDropdown"; // ✅ import UserDropdown

const HeaderAdmin = ({ onToggleSidebar }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between gap-2">
        {/* Hamburger Menu */}
        <button
          onClick={onToggleSidebar}
          className="text-gray-700 hover:text-gray-900"
        >
          <Menu size={22} />
        </button>

        {/* Search Bar */}
        <div className="pl-2.5 relative hidden md:block w-1/3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search size={18} className="" />
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full rounded border text-sm border-gray-300 focus:outline-none focus:ring focus:ring-blue-100"
          />
        </div>

        {/* User Dropdown */}
        <UserDropdown />
      </div>
    </header>
  );
};

export default HeaderAdmin;
