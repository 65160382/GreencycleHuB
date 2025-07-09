import "./StepGuides.css";

export default function StepGuides() {
  const steps = [
    { id: "1", text: "แยกขยะตามประเภท", img: "/waste-home1.png" },
    {
      id: "2",
      text: "อัปโหลดรูปภาพของขยะเพื่อบันทึกข้อมูล",
      img: "/waste-home2.png",
    },
    { id: "3", text: "จองคิวขายขยะรีไซเคิล", img: "/waste-home3.png" },
    { id: "4", text: "รอคนขับไปรับซื้อขยะถึงบ้าน", img: "/waste-home4.png" },
  ];

  return (
    <div className="content-steps">
      <h2>ใช้งานง่ายๆเพียง 4 ขั้นตอน</h2>
      <div className="steps-grid">
        {steps.map((step) => (
          <div key={step.id} className="step-item">
            <p>{`${step.id}. ${step.text}`}</p>
            <img src={step.img} alt={`Step ${step.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
