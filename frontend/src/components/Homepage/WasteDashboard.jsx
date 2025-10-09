import { Recycle, Droplet, GlassWater, Package, Beer } from "lucide-react";

const WasteDashboard = ({ wasteCollections }) => {
  // ค่า wasteCollections จะเป็น object ที่รับจาก props เช่น:
  // { PET: 5.2, HDPE: 2.1, Glass: 3.0, Box: 4.4, Can: 1.8 }

  const categories = [
    {
      name: "PET",
      icon: <Recycle className="w-6 h-6 text-green-600" />,
      color: "bg-green-50",
      unit: "กก.",
      value: wasteCollections?.PET || 0,
    },
    {
      name: "HDPE",
      icon: <Droplet className="w-6 h-6 text-sky-600" />,
      color: "bg-sky-50",
      unit: "กก.",
      value: wasteCollections?.HDPE || 0,
    },
    {
      name: "Bottle Glass",
      icon: <GlassWater className="w-6 h-6 text-amber-600" />,
      color: "bg-amber-50",
      unit: "กก.",
      value: wasteCollections?.Glass || 0,
    },
    {
      name: "Card Box",
      icon: <Package className="w-6 h-6 text-yellow-600" />,
      color: "bg-yellow-50",
      unit: "กก.",
      value: wasteCollections?.Box || 0,
    },
    {
      name: "Can Aluminium",
      icon: <Beer className="w-6 h-6 text-gray-700" />,
      color: "bg-gray-50",
      unit: "กก.",
      value: wasteCollections?.Can || 0,
    },
  ];

  return (
    <div className="px-6 py-4 ">
      <h2 className="text-3xl font-bold text-center p-2 mb-6 text-black">
        ขยะสะสมของฉัน
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-2xl shadow-sm ${cat.color}`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-white shadow-sm">
                {cat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{cat.name}</p>
                <p className="text-xs text-gray-500">ประเภทขยะ</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-800">
                {cat.value.toFixed(1)}
              </p>
              <p className="text-xs text-gray-500">{cat.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WasteDashboard;
