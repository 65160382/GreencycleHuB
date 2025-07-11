import "./imagenav.css";

const Imagenav = () => {
  return (
    //    {/* ส่วนของแสดงสไลด์โชว์รูปภาพพร้อมมีข้อความแนะนำ */}
    <div className="image-container">
      <img src="home-separate.jpg" alt="" />
      <div className="overlay"></div>

      <div className="content-wrapper">
        <div className="detail-top">
          <h1>สวัสดี คุณ :</h1>
          <p>คุณยังไม่มีจำนวนขยะสะสมอยู่ในระบบ สามารถคลิกที่ปุ่ม</p>
          <a href="#">"สแกนขยะ"</a>
          <p>เพื่อเริ่มสะสมขยะเลย</p>
        </div>

        <div className="detail-bottom">
          <p>คำแนะนำ :</p>
          <p>
            ผู้ใช้สามารถทำการสแกนภาพของวัตถุรีไซเคิล เพื่อเพิ่มข้อมูลลงในระบบ
          </p>
          <p>เมื่อสแกนเสร็จสิ้นระบบจะแสดงจำนวนประเภทของขยะรีไซเคิลที่สะสมไว้</p>
        </div>

        <div className="btn-scan">
          <button type="submit">สแกนขยะ</button>
        </div>
      </div>
    </div>
  );
};

export default Imagenav;
