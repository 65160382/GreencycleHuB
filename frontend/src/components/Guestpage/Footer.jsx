import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <h2>GreencycleHub ♻️</h2>
          <p>เปลี่ยนขยะให้มีค่า เพื่อโลกที่ดีกว่า</p>
        </div>
        <div className="footer-links">
          <h3>เมนูหลัก</h3>
          <ul>
            <li>
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
      <div className="footer-bottom">
        <p>© 2025 GreencycleHub. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
