// Component โครงของ step แต่ละ step ที่ซ้ำๆกัน
const StepComponent = ({ stepNumber, title, children }) => {
  return (
    <div className="p-4 m-2.5 bg-white rounded-xl shadow-md">
      {/* Header ของแต่ละขั้นตอน */}
      <section className="flex items-center space-x-3 mb-4">
        <section className="w-7 h-7 rounded-full bg-lime-300 flex items-center justify-center text-black font-bold">
          {stepNumber}
        </section>
        <h1 className="font-semibold">{title}</h1>
      </section>

      {/* เนื้อหาด้านในของขั้นตอน */}
      {children}
    </div>
  );
};

export default StepComponent;
