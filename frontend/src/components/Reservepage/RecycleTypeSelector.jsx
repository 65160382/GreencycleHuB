import { useContext,useEffect } from "react";
import { ReserveContext } from "../../context/ReserveContext";

const RecycleTypeSelector = ({ wasteCollections }) => {
  const { selectedWaste, setSelectedWaste } = useContext(ReserveContext);

  // useEffect(()=>{
  //   console.log("value selectedwaste is:",selectedWaste)
  // },[selectedWaste])

  const handleCheckboxChange = (item, checked) => {
    try {
      if (checked) {
        // เพิ่มข้อมูลเข้า array
        setSelectedWaste((prev) => [...prev, item]);
        // console.log("value is:",selectedWaste)
      } else {
        // ลบข้อมูลออกจาก array
        setSelectedWaste((prev) =>
          prev.filter((w) => w.rec_type_id !== item.rec_type_id)
        );
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์", error);
    }
  };

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
            {wasteCollections.map((item) => (
              <tr
                key={item.rec_type_id}
                className="text-center hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-2 px-3">
                  <input
                    type="checkbox"
                    value={item.rec_type_id}
                    checked={selectedWaste.some(
                      (w) => w.rec_type_id === item.rec_type_id
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(item, e.target.checked)
                    }
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
