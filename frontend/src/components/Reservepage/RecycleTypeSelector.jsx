import React from "react";

const RecycleTypeSelector = ({ wasteCollections }) => {
  return (
    <>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-auto border border-gray-300 text-sm md:text-base">
          <thead className="bg-[#b9ff66] ">
            <tr className="text-center">
              <th className="py-2 px-3"></th>
              <th className="py-2 px-3">ประเภทขยะ</th>
              <th className="py-2 px-3">ปริมาณขยะที่สะสม</th>
              <th className="py-2 px-3">ราคาต่อกิโลกรัม</th>
              <th className="py-2 px-3">ราคาทั้งหมด</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {wasteCollections.map((item, index) => (
              <tr
                key={index}
                className="text-center hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-2 px-3">
                  <input
                    type="checkbox"
                    value={item.rec_type_id}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                </td>
                <td className="py-2 px-3 flex flex-col items-center justify-center gap-1">
                  <span className="font-medium">{item.rec_type_name}</span>
                  <img
                    src={item.rec_type_public_id}
                    alt={item.rec_type_name}
                    className="w-14 h-auto"
                  />
                </td>
                <td className="py-2 px-3">{item.total_weight} กิโลกรัม</td>
                <td className="py-2 px-3">
                  {parseFloat(item.rec_type_price).toFixed(2)} บาท
                </td>
                <td className="py-2 px-3 font-semibold text-green-700">
                  {parseFloat(item.total_price).toFixed(2)} บาท
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RecycleTypeSelector;
