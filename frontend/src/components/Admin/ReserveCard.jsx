import { Clock, CalendarDays } from "lucide-react";
import StatusBadge from "./StatusBadge";
import MapModal from "./MapModal";
import ReserveDetail from "./ReserveDetail";
import Modal from "../Core-UI/Modal";
import { useState } from "react";
import { formatDateString } from "../../utils/formateDateUtils";

const ReserveCard = ({ reserves, setResid }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedLat, setSelectedLat] = useState("");
  const [selectedLon, setSelectedLon] = useState("");

  // ยังไม่เข้าใจโค้ดตรงนี้
  const handleCheckboxChange = (item, isChecked) => {
    if (isChecked) {
      setResid((prev) => [
        ...prev,{  id: item.res_id, lat: item.add_lat, lon: item.add_lon },
      ]); //เพิ่ม lat, lon ตอน click checkbox
    } else {
      // เข้าถึง .id ใน object ก่อน filter
      setResid((prev) => prev.filter((obj) => obj.id !== item.res_id));
    }
  };

  return (
    <>
      {reserves.map((item) => (
        <div
          key={item.res_id}
          className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* checkbox */}
            <input
              type="checkbox"
              value={item.res_id}
              // ยังไม่เข้าใจโค้ดตรงนี้
              // checked={selectedId.includes(item.res_id)}
              onChange={(e) => {
                const checked = e.target.checked;
                setSelectedId(() =>
                  checked
                    && 
                      [
                        {
                          id: item.res_id,
                          lat: item.add_lat,
                          lon: item.add_lat,
                        },
                      ] //เพิ่ม lat, lon ตอน click checkbox และลองเปลี่ยนเป็น object
                );
                handleCheckboxChange(item, checked);
              }}
              //
              className="size-4 accent-emerald-600 rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            ></input>
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
                <p className="text-sm text-gray-600">
                  {item.addressLine2}
                </p>{" "}
                <span
                  onClick={() => {
                    setOpenMapModal(true),
                      setSelectedLat(item.add_lat),
                      setSelectedLon(item.add_lon);
                  }}
                  className="text-sm font-medium text-blue-500 cursor-pointer hover:underline"
                >
                  แสดงแผนที่
                </span>
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
              <button
                onClick={() => {
                  setSelectedId({
                    id: item.res_id,
                    lat: item.add_lat,
                    lon: item.add_lon,
                  });
                  setIsOpen(true);
                }}
                className="text-sm text-green-600 hover:underline font-semibold py-2 border-gray-400 "
              >
                ดูรายละเอียด
              </button>
            </div>
          </div>
        </div>
      ))}
      <MapModal
        isOpen={openMapModal}
        onClose={() => setOpenMapModal(false)}
        lat={selectedLat}
        lon={selectedLon}
      />
      <ReserveDetail
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        resId={selectedId?.id}
      />
    </>
  );
};

export default ReserveCard;
