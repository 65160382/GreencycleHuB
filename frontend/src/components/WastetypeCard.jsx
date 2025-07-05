import "./WastetypeCard.css";

export default function WastetypeCard() {
  const wasteTypes = [
    {
      name: "พลาสติกใส",
      type: "PET",
      description:
        "ขวดน้ำดื่มหรือขวดใสทั่วไป รีไซเคิงได้ง่ายและมักใช้ทำเส้นใยเสื้อผ้า",
      image: "/pet.png",
    },
    {
      name: "พลาสติกแข็งขุ่น",
      type: "HDPE",
      description:
        "ขวดนม ขวดน้ำยาซักผ้า เป็นพลาสติกแข็งสีขุ่นหรือขาว รีไซเคิลได้ดี",
      image: "/hdpe.png",
    },
    {
      name: "กระป๋องอะลูมิเนียม",
      type: "Can (Aluminium)",
      description:
        "กระป๋องน้ำอัดลมหรือเบียร์ สามารถหลอมและนำกลับมาใช้ใหม่ได้เกือบ 100%",
      image: "/aluminum-can.png",
    },
    {
      name: "กล่องกระดาษ",
      type: "Cardboard",
      description: "กล่องลัง กล่องพัสดุ สามารถนำมารีไซเคิลเป็นกระดาษใหม่ได้",
      image: "/cardboard.png",
    },
    {
      name: "ขวดแก้ว",
      type: "Glass Bottle",
      description:
        "ขวดเครื่องดื่มหรือขวดโหลต่าง ๆ รีไซเคิลได้หลายรอบโดยไม่ลดคุณภาพ",
      image: "/glass-bottle.png",
    },
  ];
  return (
    <div className="container-card">
      <h2>ประเภทขยะที่รับซื้อในระบบ</h2>
      <div className="wastetype-card">
        {wasteTypes.map((waste, index) => (
          <div className="waste-card-item" key={index}>
            <img src={waste.image} alt={waste.name}/>
            <p className="head">{waste.name}</p>
            <p className="des">{waste.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
