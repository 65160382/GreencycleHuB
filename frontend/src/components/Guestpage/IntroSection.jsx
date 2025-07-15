// import "./IntroSection.css";

export default function IntroSection() {
  return (
    <section className="bg-gradient-to-br from-green-50 to-white py-20 px-4 md:px-16 flex flex-col md:flex-row items-center justify-between ">
      {/* Text Section */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          ขยะของคุณมีค่า!
        </h1>
        <p className="text-lg text-gray-600">
          ระบบจัดการขยะที่ช่วยให้คุณเปลี่ยนของเหลือใช้ให้มีค่า
          เพียงแค่ถ่ายรูปขยะที่คุณต้องการขาย แล้วจองคิวให้คนขับมารับซื้อถึงบ้าน
          ช่วยลดขยะและสร้างรายได้เสริมไปพร้อมกัน!
        </p>
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">
          เริ่มต้นใช้งาน
        </button>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 mt-10 md:mt-0">
        <img
          src="https://static.thairath.co.th/media/Dtbezn3nNUxytg04ajY5FY6LrRmAAcVkqkVMMPvLlMpwSo.jpg"
          alt="รีไซเคิล"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </section>
  );
}
