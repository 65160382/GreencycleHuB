export default function StepGuides() {
  const steps = [
    { id: "1", text: "แยกขยะตามประเภท", img: "/waste-home1.png" },
    { id: "2", text: "อัปโหลดรูปภาพของขยะเพื่อบันทึกข้อมูล", img: "/waste-home2.png" },
    { id: "3", text: "จองคิวขายขยะรีไซเคิล", img: "/waste-home3.png" },
    { id: "4", text: "รอคนขับไปรับซื้อขยะถึงบ้าน", img: "/waste-home4.png" },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-12 text-black">
        ใช้งานง่ายๆ เพียง 4 ขั้นตอน
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            {/* วงกลมแสดงเลข */}
            <div className="bg-green-500 text-white w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold mb-4">
              {step.id}
            </div>

            {/* รูปภาพ */}
            <img
              src={step.img}
              alt={`ขั้นตอนที่ ${step.id}`}
              className="w-28 h-28 object-contain mb-4"
            />

            {/* ข้อความ */}
            <p className="text-gray-700 font-medium">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
