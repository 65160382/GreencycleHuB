import { MapPin, Phone, Mail } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-[#191a23] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-10">
        {/* ส่วน grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold mb-2">GreencycleHub ♻️</h2>
            <p className="text-gray-300 leading-relaxed">
              เปลี่ยนขยะให้มีค่า เพื่อโลกที่ดีกว่า
            </p>
          </div>

          {/* Links */}
          <nav aria-label="เมนูหลัก" className="text-center sm:text-left">
            <h3 className="text-lg font-medium mb-3">เมนูหลัก</h3>
            <ul className="space-y-2">
              {[
                "หน้าหลัก",
                "แนะนำการแยกขยะ",
                "จองคิวรับซื้อขยะ",
                "ติดตามสถานะ",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:underline text-gray-300 hover:text-white transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-medium mb-3">ติดต่อเรา</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-5 h-5 text-green-400 shrink-0" />
                <span>ชลบุรี, ประเทศไทย</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="w-5 h-5 text-green-400 shrink-0" />
                <span>02-123-4567</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-5 h-5 text-green-400 shrink-0" />
                <a
                  href="mailto:support@GreencycleHub.com"
                  className="hover:underline hover:text-white transition"
                >
                  support@GreencycleHub.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-medium mb-3">ติดตามเรา</h3>
            {/* <div className="flex justify-center sm:justify-start gap-3">
              {[
                { icon: "👍", label: "Facebook" },
                { icon: "📸", label: "Instagram" },
                { icon: "✖️", label: "Twitter" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
                >
                  {icon}
                </a>
              ))}
            </div> */}
          </div>
        </div>

        {/* divider + bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400 text-center sm:text-left">
            <p>© 2025 GreencycleHub. All rights reserved.</p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4">
              <a href="#" className="hover:text-white">
                นโยบายความเป็นส่วนตัว
              </a>
              <a href="#" className="hover:text-white">
                ข้อกำหนดการใช้งาน
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
