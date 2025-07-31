import React from "react";

const RecycleTypeSelector = ({ wasteCollections }) => {
  return (
    <>
      <table className="w-full border ">
        <thead className="border p-2.5">
          <tr>
            <th></th>
            <th>ประเภทขยะ</th>
            <th>จำนวนปริมาณขยะที่สะสม</th>
            <th>ราคาต่อกิโลกรัม</th>
            <th>ราคาทั้งหมด</th>
          </tr>
        </thead>
        <tbody className="font-medium p-2.5">
          {wasteCollections.map((item, index) => (
            <tr key={index} className="text-center">
              <td><input type="checkbox" value={item.rec_type_id} /></td>
              <td className="flex flex-col items-center justify">{item.rec_type_name}<img src={item.rec_type_public_id} className="w-12 h-auto"/></td>
              <td>{item.total_weight} กิโลกรัม</td>
              <td>{parseFloat(item.rec_type_price).toFixed(2)} บาท</td>
              <td>{parseFloat(item.total_price).toFixed(2)} บาท</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RecycleTypeSelector;
