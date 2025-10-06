import { MapPinHouse, Weight, Clock4 } from "lucide-react";

const TimetableCard = ({ round, onSelectPoint, selectedPoint, onStart }) => {
  return (
    <div
      key={round.time_id}
      className="border rounded-md shadow-sm p-6 bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">รอบเก็บขยะ {round.time_slot}</h2>
        <span className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-full">
          Pending
        </span>
      </div>

      {/* รายละเอียดรอบ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
        <div>
          <div className="text-gray-500 flex flex-row gap-2">
            <MapPinHouse size={17} />
            <span>จุดเก็บขยะ</span>
          </div>
          <div className="font-medium items-center">
            {round.total_points} จุด
          </div>
        </div>
        <div>
          <div className="text-gray-500 flex flex-row gap-2">
            <Weight size={17} />
            <span>น้ำหนักรวม</span>
          </div>
          <div className="font-medium">{round.total_weight} กก.</div>
        </div>
        <div>
          <div className="text-gray-500 flex flex-row gap-2">
            <Clock4 size={17} />
            <span>เวลาเริ่มต้น</span>
          </div>
          <div className="font-medium">{round.time_slot.split("-")[0]} น.</div>
        </div>
        <div>
          <div className="text-gray-500 flex flex-row gap-2">
            <Clock4 size={17} />
            <span>เวลาสิ้นสุด</span>
          </div>
          <div className="font-medium">{round.time_slot.split("-")[1]} น.</div>
        </div>
      </div>

      {/* ปุ่มลำดับจุด */}
      <div className="flex gap-2 mt-4">
        {round.items.map((point) => (
          <button
            key={point.res_id}
            onClick={() => onSelectPoint(point.res_id)}
            className={`px-3 py-1 rounded border text-sm ${
              selectedPoint === point.res_id
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            จุดที่ {point.time_index}
          </button>
        ))}
      </div>

      {/* แสดงรายละเอียดจุดที่เลือก */}
      {selectedPoint && (
        <div className="mt-4 border rounded p-4 bg-gray-50">
          {(() => {
            const selected = round.items.find(
              (p) => p.res_id === selectedPoint
            );
            return selected ? (
              <>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  จุดที่ {selected.time_index}
                </h3>
                <p className="text-sm text-gray-600">{selected.addressLine1}</p>
                <p className="text-sm text-gray-600">{selected.addressLine2}</p>
              </>
            ) : (
              <p className="text-sm text-gray-500">เลือกจุดเพื่อดูรายละเอียด</p>
            );
          })()}
        </div>
      )}

      {/* ปุ่มเริ่มเก็บขยะ */}
      <button
        type="button"
        onClick={() => {
        //   setSelectedRound(round);
        //   setIsConfirmOpen(true);
        onStart();
        }}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
      >
        เริ่มเก็บขยะ
      </button>
    </div>
  );
};

export default TimetableCard;
