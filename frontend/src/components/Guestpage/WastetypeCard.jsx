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
      <h2 className="text-3xl text-center font-bold ml-5 mb-5 py-5 text-black">
        ประเภทขยะที่รับซื้อในระบบ
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        {wasteTypes.map((waste, index) => (
          <div
            key={index}
            href="#"
            className="group relative w-[300px] h-[400px] block bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={waste.image}
              alt={waste.name}
              className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-300"
            />

            <div className="relative p-4 sm:p-6 h-full flex flex-col justify-end">
              <p className="text-xl font-bold text-white sm:text-2xl">
                {waste.name}
              </p>

              <div className="mt-4 sm:mt-8">
                <div className="translate-y-8 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm text-white">{waste.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
