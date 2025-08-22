const TableReserve = ({ details , reserve  }) => {
  return (
    <div className="rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Head */}
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              {/* คอลัมน์รวม: รูป + ชื่อ */}
              <th className="px-3 py-3 text-left">ประเภทขยะรีไซเคิล</th>
              <th className="px-3 py-3 text-right">จำนวน (กก.)</th>
              <th className="px-3 py-3 text-right">ราคาต่อหน่วย</th>
              <th className="px-4 py-3 text-right">ราคารวม</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {details.map((item) => (
              <tr key={item.rec_type_id} className="hover:bg-gray-50/70">
                {/* รูป + ชื่อ (คอลัมน์เดียว) */}
                <td className="px-3 py-3 text-gray-800">
                  <div className="flex items-center gap-3 min-w-[180px]">
                    <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                      {item.rec_type_public_id ? (
                        <img
                          src={item.rec_type_public_id}
                          alt={item.rec_type_name || "recycle"}
                          className="block max-h-9 max-w-9 object-contain"
                        />
                      ) : (
                        <span className="text-[10px] text-gray-400">N/A</span>
                      )}
                    </div>
                    <span className="leading-tight">{item.rec_type_name || "-"}</span>
                  </div>
                </td>

                <td className="px-3 py-3 text-right text-gray-700">
                  {Number(item.total_weight).toFixed(2)}
                </td>

                <td className="px-3 py-3 text-right text-gray-700">
                  {Number(item.rec_type_price).toFixed(2)} บาท
                </td>

                <td className="px-4 py-3 text-right font-medium text-gray-900">
                  {Number(item.total_price).toFixed(2)} บาท
                </td>
              </tr>
            ))}

            {details.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  ไม่มีรายการ
                </td>
              </tr>
            )}
          </tbody>

          {/* Foot (summary) */}
          <tfoot>
            <tr className="bg-gray-50">
              {/* รวมให้ชิดขวาใต้คอลัมน์ชื่อ+จำนวน */}
              <td className="px-3 py-3 text-right font-medium text-gray-700" colSpan={2}>
                รวม
              </td>
              <td className="px-3 py-3 text-right font-medium text-gray-700">
                {Number(reserve.res_weight).toFixed(2)} กิโลกรัม
              </td>
              <td className="px-4 py-3 text-right font-bold">
                {Number(reserve.res_amount).toFixed(2)} บาท
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TableReserve;
