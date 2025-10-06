// import React from "react";

const ConfirmWasteModal = ({ isOpen, onClose, onConfirm,currentItem }) => {
  if (!isOpen) return null;

  return (
    <div className="p-6">
      <div className="mb-4 border-b pb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          รายละเอียดการรับขยะจากลูกค้า
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          โปรดตรวจสอบรายการขยะก่อนกดยืนยันการรับ
        </p>
      </div>

      {currentItem?.wastes?.length > 0 ? (
        <div className="space-y-3">
          {currentItem.wastes.map((waste, index) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-lg px-4 py-3 hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {waste.rec_type_name}
                </p>
                <p className="text-sm text-gray-500">
                  น้ำหนักรวม: {waste.total_weight} กก.
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  ราคาต่อกก.: {waste.waste_collect_price} บาท
                </p>
                <p className="text-base font-semibold text-green-600">
                  รวม {parseFloat(waste.total_price).toFixed(2)} บาท
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">
          ไม่มีข้อมูลรายการขยะในจุดนี้
        </p>
      )}

      {currentItem?.wastes?.length > 0 && (
        <div className="mt-6 border-t pt-4 flex justify-between items-center">
          <p className="font-semibold text-gray-700">ราคารวมทั้งหมด</p>
          <p className="text-xl font-bold text-green-600">
            {currentItem.wastes
              .reduce((sum, item) => sum + parseFloat(item.total_price), 0)
              .toFixed(2)}{" "}
            บาท
          </p>
        </div>
      )}

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
        >
          ยกเลิก
        </button>
        <button
          onClick={() => {
            // TODO: เรียก API update สถานะการรับขยะ
            // onClose();
            onConfirm();
          }}
          className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700"
        >
          ยืนยันการรับขยะ
        </button>
      </div>
    </div>
  );
};

export default ConfirmWasteModal;
