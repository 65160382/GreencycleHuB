import { MapPin, User, AlertCircle } from "lucide-react"

const DestinationInfo = ({ currentItem }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header with destination number */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="bg-gray-600 text-white rounded-md w-8 h-8 flex items-center justify-center font-semibold text-sm">
          {currentItem?.time_index}
        </div>
        <h2 className="text-lg font-semibold text-gray-900">จุดที่ {currentItem?.time_index}</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Address Section */}
        <div>
          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-sm text-gray-600">ที่อยู่</span>
          </div>
          <p className="text-gray-900 text-sm leading-relaxed pl-6">
            {currentItem?.addressLine1} {currentItem?.addressLine2}
          </p>
        </div>

        {/* Customer Information Section */}
        <div>
          <div className="flex items-center gap-2 text-gray-700 mb-3">
            <User className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-sm text-gray-600">ข้อมูลลูกค้า</span>
          </div>

          <div className="pl-6 space-y-3">
            {/* Customer Name */}
            <div className="flex items-start">
              <span className="text-sm text-gray-500 w-24 flex-shrink-0">ชื่อ</span>
              <span className="text-sm text-gray-900 font-medium">{currentItem?.customers_name}</span>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <span className="text-sm text-gray-500 w-24 flex-shrink-0">อีเมล</span>
              <span className="text-sm text-gray-900 break-all">{currentItem?.cus_email}</span>
            </div>

            {/* Phone */}
            <div className="flex items-start">
              <span className="text-sm text-gray-500 w-24 flex-shrink-0">เบอร์โทร</span>
              <span className="text-sm text-gray-900">{currentItem?.cus_phone}</span>
            </div>
          </div>
        </div>

        {/* Reminder Note */}
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-900">อย่าลืมกดปุ่ม "ถึงจุดหมาย" เมื่อไปถึงแล้ว</p>
        </div>
      </div>
    </div>
  )
}

export default DestinationInfo
