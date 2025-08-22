import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

// ช่วยทำ label ให้อ่านง่ายขึ้น (เช่น "order-history" -> "Order History")
function prettify(seg) {
  const raw = decodeURIComponent(seg);
  // ถ้ามีในพจนานุกรมก็ใช้เลย

  // ถ้าเป็นตัวเลขล้วน ให้ใส่ # นำหน้า (เช่น id)
  if (/^\d+$/.test(raw)) return `#${raw}`;

  // แปลง dash เป็นเว้นวรรค และขึ้นต้นตัวใหญ่
  return raw.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export const Breadcrumb = () => {
  const { pathname } = useLocation(); // เช่น "/category/product"
  const parts = pathname.split("/").filter(Boolean); // ["category","product"]

  // สร้าง items ไล่จาก root -> path ปัจจุบัน
  const items = [
    { href: "/home", label: "Home" }, // หน้าแรก
    ...parts.map((seg, i) => ({
      href: "/" + parts.slice(0, i + 1).join("/"), // "/category", "/category/product"
      label: prettify(seg),
    })),
  ];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm text-gray-700">
        {items.map((it, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={it.href} className="flex items-center gap-1">
              {/* ตัวคั่น (ลูกศร svg) แสดงตั้งแต่ตัวที่ 2 เป็นต้นไป */}
              {i !== 0 && (
                <span className="rtl:rotate-180 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}

              {/* ชิ้นสุดท้ายไม่คลิก (aria-current="page") */}
              {isLast ? (
                <span
                  className="flex items-center gap-1 font-medium text-gray-900 "
                  aria-current="page"
                  title={it.label}
                >
                  {it.label}
                </span>
              ) : (
                <Link
                  to={it.href}
                  className="flex items-center gap-1 transition-colors hover:text-green-600"
                  title={it.label}
                >
                  {it.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
