const Footer = () => {
  return (
    <footer className="bg-[#191a23] text-white">
      {/* container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* grid: 1 → 2 → 4 คอลัมน์ตามขนาดหน้าจอ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">GreencycleHub ♻️</h2>
            <p className="text-gray-300">
              เปลี่ยนขยะให้มีค่า เพื่อโลกที่ดีกว่า
            </p>
          </div>

          {/* Links */}
          <nav aria-label="เมนูหลัก">
            <h3 className="text-lg font-medium mb-3">เมนูหลัก</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline text-gray-300 hover:text-white">
                  หน้าหลัก
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-300 hover:text-white">
                  แนะนำการแยกขยะ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-300 hover:text-white">
                  จองคิวรับซื้อขยะ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-300 hover:text-white">
                  ติดตามสถานะ
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-3">ติดต่อเรา</h3>
            <ul className="space-y-2 text-gray-300">
              <li>📍 ชลบุรี, ประเทศไทย</li>
              <li>📞 02-123-4567</li>
              <li>
                📧 <a href="mailto:support@GreencycleHub.com" className="hover:underline hover:text-white">
                  support@GreencycleHub.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-medium mb-3">ติดตามเรา</h3>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition">
                {/* ไอคอนแบบเรียบง่ายด้วย emoji หรือจะใช้ไลบรารีก็ได้ */}
                👍
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition">
                📸
              </a>
              <a href="#" aria-label="X/Twitter" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition">
                ✖️
              </a>
            </div>
          </div>
        </div>

        {/* divider + bottom bar */}
        <div className="mt-8 border-t border-white/10 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
            <p>© 2025 GreencycleHub. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">นโยบายความเป็นส่วนตัว</a>
              <a href="#" className="hover:text-white">ข้อกำหนดการใช้งาน</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
