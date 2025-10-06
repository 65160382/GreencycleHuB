import {
  ClipboardList,
  Truck,
  Package,
} from "lucide-react";

// ตรงนี้ต้องเปลี่ยนเป็นดึงจำนวนรายการจอง


const SummaryStatus = ({ summary }) => {

  const item = [
  {
    icon: <ClipboardList size={24} />,
    total: summary.total,
    label: "Total Task",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Truck size={24} />,
    total: summary.completed,
    label: "Pickup",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: <Package size={24} />,
    total: summary.pending,
    label: "Available",
    color: "bg-green-100 text-green-600",
  },
];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-4">
      {item.map((task, index) => (
        <div
          key={index}
          className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm p-5"
        >
          {/* Icon with colored background */}
          <div className={`p-3 rounded-full mr-4 ${task.color}`}>
            {task.icon}
          </div>

          {/* Text */}
          <div>
            <p className="text-xl font-bold text-slate-800">{task.total}</p>
            <span className="text-sm text-gray-500">{task.label}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SummaryStatus;
