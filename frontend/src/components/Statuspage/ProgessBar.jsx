import { Check } from "lucide-react";

export default function ProgressBar({ steps = [], current = 0 }) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center w-full max-w-3xl">
        {steps.map((step, i) => {
          const completed = i < current;
          const active = i === current;

          // สีของวงกลม
          const circleClass = completed
            ? "bg-emerald-500 border-emerald-500 text-white"
            : active
            ? "bg-white border-emerald-500 text-emerald-600"
            : "bg-gray-200 border-gray-300 text-gray-500";

          // สีเส้นเชื่อม
          const lineClass = completed ? "bg-emerald-500" : "bg-gray-300";

          return (
            <div key={i} className="flex items-center flex-1">
              {/* วงกลมสถานะ */}
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${circleClass}`}>
                {completed ? <Check className="w-4 h-4" /> : i + 1}
              </div>

              {/* เส้นเชื่อม ยกเว้น step สุดท้าย */}
              {i < steps.length - 1 && (
                <div className={`flex-1 h-1 ${lineClass}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ตัวอย่างการใช้งาน
//
// const steps = ["ส่งคำขอจอง", "รอการยืนยัน", "ยืนยันแล้ว", "สำเร็จ"];
// <ProgressBar steps={steps} current={2} />
