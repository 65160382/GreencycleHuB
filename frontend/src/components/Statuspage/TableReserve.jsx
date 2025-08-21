
const TableReserve = ( { details, reserve }) => {
  return (
    <div className="overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left font-semibold w-16">&nbsp;</th>
            <th className="px-2 py-3 text-left font-semibold">
              ประเภทขยะรีไซเคิล
            </th>
            <th className="px-2 py-3 text-left font-semibold">
              จำนวน(กิโลกรัม)
            </th>
            <th className="px-2 py-3 text-left font-semibold">ราคาต่อหน่วย</th>
            <th className="px-4 py-3 text-right font-semibold">ราคารวม</th>
          </tr>
        </thead>
        {/* map ค่าที่ได้จาก database มาใส่ */}
        <tbody className="divide-y divide-gray-100">
          {details.map((item) => (
          <tr key={item.rec_type_id}>
            <td className="px-4 py-3">
              <div className="h-10 w-10 rounded-md bg-gray-100 grid place-items-center">
                <img src={item.rec_type_public_id} alt="recyletype"></img>
              </div>
            </td>
            <td className="px-2 py-3 text-gray-800">{item.rec_type_name}</td>
            <td className="px-2 py-3 text-gray-700"> {item.total_weight} กิโลกรัม</td>
            <td className="px-2 py-3 text-gray-700">{item.rec_type_price} บาท</td>
            <td className="px-4 py-3 text-right font-medium text-gray-900">
              {parseFloat(item.total_price).toFixed(2)} บาท
            </td>
          </tr>
           ))} 
        </tbody>
        {/* ส่วนสรุปน้ำหนักและราคารวม */}
        <tfoot>
          <tr className="border-gray-200 bg-gray-50">
            <td className="px-4 py-3" />
            <td
              className="px-2 py-3 text-right font-medium text-gray-700"
              colSpan={2}
            >
              รวม
            </td>
            <td className="px-2 py-3 font-medium text-gray-700">
              {parseFloat(reserve.res_weight).toFixed(2)} กิโลกรัม
            </td>
            <td className="px-4 py-3 text-right font-bold">
              {parseFloat(reserve.res_amount).toFixed(2)} บาท
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableReserve;
