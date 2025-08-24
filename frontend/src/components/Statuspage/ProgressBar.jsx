import { Check, Clock, Truck, MapPin, Package } from "lucide-react";

const steps = [
  { label: "ยืนยันการจอง", icon: Check },
  { label: "รอดำเนินการ", icon: Clock },
  { label: "กำลังดำเนินการ", icon: Truck },
  { label: "ถึงจุดหมาย", icon: MapPin },
  { label: "เสร็จสิ้น", icon: Package },
];

export default function ProgressBar({ currentStep }) {
  const getIcon = (IconComponent, index, isCompleted, isCurrent) => {
    if (isCompleted) {
      return <Check className="w-5 h-5 text-white" />;
    }
    return <IconComponent className={`w-5 h-5 ${isCurrent ? "text-blue-600" : "text-gray-400"}`} />;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-base font-semibold text-gray-800 mb-7 ">สถานะการจอง</h2>
      
      <div className="flex flex-col space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isFuture = index > currentStep;
          
          return (
            <div key={index} className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? "bg-green-500"
                      : isCurrent
                      ? "bg-blue-500 ring-4 ring-blue-100"
                      : "bg-gray-200"
                  }`}
                >
                  {getIcon(step.icon, index, isCompleted, isCurrent)}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-16 w-1 ${
                      isCompleted ? "bg-green-500" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
              
              <div
                className={`flex-1 pb-6 ${
                  index < steps.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div
                  className={`p-4 rounded-lg ${
                    isCurrent
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3
                      className={`font-medium ${
                        isCompleted
                          ? "text-green-700"
                          : isCurrent
                          ? "text-blue-700"
                          : "text-gray-600"
                      }`}
                    >
                      {step.label}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isCompleted
                          ? "bg-green-100 text-green-800"
                          : isCurrent
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {isCompleted
                        ? "สำเร็จ"
                        : isCurrent
                        ? "กำลังดำเนินการ"
                        : "รอดำเนินการ"}
                    </span>
                  </div>
                  {isCurrent && (
                    <p className="text-sm text-gray-600 mt-2">
                      ขณะนี้กำลังอยู่ในขั้นตอน{"  "}{step.label.toLowerCase()} กรุณารอสักครู่
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}