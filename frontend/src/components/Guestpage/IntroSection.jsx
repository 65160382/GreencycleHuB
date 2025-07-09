import "./IntroSection.css";

export default function IntroSection() {
  return (
    <div className="content-row">
      <div className="content-text">
        <h1>"ขยะของคุณมีค่า!🌍♻️"</h1>
        <p>
          อย่าปล่อยให้ขยะกลายเป็นภาระต่อโลก
          มาร่วมกันรีไซเคิลเพื่อสิ่งแวดล้อมที่ดีขึ้น
        </p>
        <p>
          เพียงแค่ถ่ายรูปขยะที่คุณต้องการขาย แล้วจองคิวให้คนขับมารับซื้อถึงบ้าน
        </p>
        <p>ช่วยลดขยะและสร้างรายได้เสริมไปพร้อมกัน!</p>
      </div>
      
      <div className="content-img">
        <img
          src="https://static.thairath.co.th/media/Dtbezn3nNUxytg04ajY5FY6LrRmAAcVkqkVMMPvLlMpwSo.jpg"
          alt="content-img"
        ></img>
      </div>
    </div>
  );
}
