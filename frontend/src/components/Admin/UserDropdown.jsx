import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="relative ml-auto">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/profile.png" alt="User" />
        </span>

        <span className="block mr-1 font-medium text-sm">สุดหล่อ</span>
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
              สุดหล่อ บ่อดิน
            </span>
            <span className="block text-xs text-gray-500">
              sudlow@gmail.com
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
            to="/signin"
            className="block px-3 py-2 rounded-md text-sm text-red-500 hover:bg-gray-100"
          >
            Sign out
          </Link>
        </div>
      )}
    </div>
  );
}
