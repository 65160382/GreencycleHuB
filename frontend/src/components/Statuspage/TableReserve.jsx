import React from "react";

const TableReserve = () => {
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
          {/* {items.map((it) => ( */}
          <tr key={""}>
            <td className="px-4 py-3">
              <div className="h-10 w-10 rounded-md bg-gray-100 grid place-items-center">
                {/* placeholder for icon */}
                {/* <span className="text-xs text-gray-500">♻️</span> */}
              </div>
            </td>
            <td className="px-2 py-3 text-gray-800">{""}</td>
            <td className="px-2 py-3 text-gray-700">น้ำหนัก {""} กิโลกรัม</td>
            <td className="px-2 py-3 text-gray-700">{""} บาท</td>
            <td className="px-4 py-3 text-right font-medium text-gray-900">
              {""} บาท
            </td>
          </tr>
          {/* ))} */}
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
              {/* {totals.kg.toFixed(1)} กิโลกรัม */}
            </td>
            <td className="px-4 py-3 text-right font-bold">
              {/* {totals.amount.toFixed(1)} บาท */}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableReserve;
