import React from 'react'
import { MapPin, User, Phone, Mail, Clock } from "lucide-react";

const DestinationInfo = ({currentItem}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              จุดที่ {currentItem?.time_index}
            </h2>

            {/* ที่อยู่ */}
            <div className="mb-5">
              <div className="flex items-center text-gray-600 mb-1">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="font-medium">ที่อยู่</span>
              </div>
              <p className="text-gray-800 bg-gray-50 rounded-md px-3 py-2 border">
                {currentItem?.addressLine1} {currentItem?.addressLine2}
              </p>
            </div>

            {/* ข้อมูลลูกค้า */}
            <div className="mb-5">
              <div className="flex items-center text-gray-600 mb-1">
                <User className="w-4 h-4 mr-2" />
                <span className="font-medium">ข้อมูลลูกค้า</span>
              </div>
              <div className="bg-gray-50 rounded-md p-3 border space-y-1">
                <p>ชื่อ: {currentItem?.customers_name}</p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />{" "}
                  {currentItem?.cus_email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-500" />{" "}
                  {currentItem?.cus_phone}
                </p>
              </div>
            </div>

            {/* หมายเหตุ */}
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm rounded">
              หมายเหตุ: อย่าลืมกดปุ่ม "ถึงจุดหมาย" เมื่อไปถึงแล้ว
            </div>
          </div>
  )
}

export default DestinationInfo