const Footer = () => {
  return (
    <footer className="bg-[#191a23] text-white text-center m-0 p-5">
      <div className="flex flex-wrap justify-between macx-w-[1200px] m-2.5 p-2.5">
        <div className="footer-logo">
          <h2 className="text-2xl mb-2.5">GreencycleHub ♻️</h2>
          <p>เปลี่ยนขยะให้มีค่า เพื่อโลกที่ดีกว่า</p>
        </div>
        <div className="footer-links">
          <h3>เมนูหลัก</h3>
          <ul className="list-none p-0">
            <li className="m-[5px] hover:underline"> 
              <a href="#">หน้าหลัก</a>
            </li>
            <li>
              <a href="#">แนะนำการแยกขยะ</a>
            </li>
            <li>
              <a href="#">จองคิวรับซื้อขยะ</a>
            </li>
            <li>
              <a href="#">ติดตามสถานะ</a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>ติดต่อเรา</h3>
          <p>📍 ที่อยู่: ชลบุรี, ประเทศไทย</p>
          <p>📞 โทร: 02-123-4567</p>
          <p>📧 อีเมล: support@GreencycleHub.com</p>
        </div>
        <div className="footer-social">
          <h3>ติดตามเรา</h3>
        </div>
      </div>
      <div className="mt-5 pt-2.5 border-t border-[#ddd]">
        <p>© 2025 GreencycleHub. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
