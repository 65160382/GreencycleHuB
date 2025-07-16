// import "./WastetypeCard.css";

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
    <div className="bg-gradient-to-br from-green-50 to-white p-6">
      <h2 className="text-3xl font-bold ml-5 mb-5 py-5 text-green-800">
        ประเภทขยะที่รับซื้อในระบบ
      </h2>

      <div className="flex flex-wrap gap-6">
        {wasteTypes.map((waste, index) => (
          <div
            key={index}
            // className="flex flex-col sm:flex-row items-center gap-6 bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition"
            className="flex-wrap max-w-[450px] border  justify-center items-center bg-white rounded-xl p-5"
          >
            <img
              src={waste.image}
              alt={waste.name}
              // className="w-32 h-32 object-contain"
              className="w-[400px] h-auto mb-2.5"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {waste.name}
              </h3>
              <p className="text-gray-600 text-base">{waste.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
