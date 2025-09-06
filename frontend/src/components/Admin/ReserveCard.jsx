import { Clock, CalendarDays } from "lucide-react";
import StatusBadge from "./StatusBadge";
import MapModal from "./MapModal";
import AssignDriverModal from "./AssignDriverModal";
import { useState } from "react";

// ฟังก์ชั่นสำหรับจัดรูปแบบวันที่ toLocaleDateString()
const formatDateString = (date) => {
  if (!date) return "ไม่มีข้อมูลวันที่จอง";

  // ถ้าใช้ "th-TH" → จะได้เป็น 15/08/2568 (พ.ศ.)
  const formattedDate = new Date(date).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};

const ReserveCard = ({ reserves }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedLat, setSelectedLat] = useState("");
  const [selectedLon, setSelectedLon] = useState("");

  return (
    <>
      {reserves.map((item) => (
        <div
          key={item.res_id}
          className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <input type="checkbox" value={item.res_id} className="size-4 accent-emerald-600 rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500 cursor-pointer"></input>
            {/* profile + info */}
            <div className="flex items-center gap-4 flex-1 min-w-[200px]">
              <div className="w-12 h-12 bg-gray-500 rounded-full text-white flex items-center justify-center font-semibold">
                C
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">
                  {item.customers_name}
                </h2>
                <p className="text-sm text-gray-600">{item.addressLine1}</p>
                <p className="text-sm text-gray-600">{item.addressLine2}</p> <span onClick={()=> {setOpenMapModal(true),setSelectedLat(item.add_lat), setSelectedLon(item.add_lon)}} className="text-sm font-medium text-blue-500 cursor-pointer hover:underline">แสดงแผนที่</span>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={14} />
                    <span>{formatDateString(item.res_booking_date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{item.res_time_slot}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* status + action */}
            <div className="flex items-center gap-4">
              <StatusBadge status={item.res_status} />
              {item.res_status == "confirmed" && (
                <button
                  onClick={() => {
                    setSelectedId(item.res_id);
                    setIsOpen(true);
                  }}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-md shadow"
                >
                  ดูรายละเอียด
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      <MapModal isOpen={openMapModal} onClose={() => setOpenMapModal(false)} lat={selectedLat} lon={selectedLon} />
      <AssignDriverModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        resId={selectedId}
      />
    </>
  );
};

export default ReserveCard;
