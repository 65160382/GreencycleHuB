import  { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
 
const DateRangePicker = ({startDate, setStartDate, endDate, setEndDate}) => {
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);

  const today = new Date();
  // ดึงปีจากเดือนปัจจุบันที่เลือก
  const year = currentMonth.getFullYear();
  // ดึงเดือนจากเดือนปัจจุบันที่เลือก (0-11, โดย 0 = มกราคม)
  const month = currentMonth.getMonth();
  
  // หาวันแรกของเดือน (วันที่ 1)
  const firstDayOfMonth = new Date(year, month, 1);
  // หาวันสุดท้ายของเดือน (วันที่ 0 ของเดือนถัดไป = วันสุดท้ายของเดือนปัจจุบัน)
  const lastDayOfMonth = new Date(year, month + 1, 0);
  // หาว่าวันแรกของเดือนตรงกับวันไหนในสัปดาห์ (0=อาทิตย์, 1=จันทร์, ...)
  const firstDayWeekday = firstDayOfMonth.getDay();
  // หาจำนวนวันทั้งหมดในเดือน
  const daysInMonth = lastDayOfMonth.getDate();
  
  // อาร์เรย์ชื่อเดือนภาษาอังกฤษ สำหรับแสดงในหัวข้อปฏิทิน
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // ฟังก์ชันสำหรับจัดรูปแบบวันที่ให้เป็นข้อความที่อ่านง่าย
  const formatDateDisplay = (date) => {
    // ถ้าไม่มีวันที่ ให้คืนค่าเป็นสตริงว่าง
    if (!date) return '';
    // จัดรูปแบบวันที่เป็น "MMM DD, YYYY" เช่น "Aug 23, 2025"
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',    // แสดงปีเป็นตัวเลข 4 หลัก
      month: 'short',     // แสดงเดือนเป็นชื่อสั้น 3 ตัวอักษร
      day: 'numeric'      // แสดงวันเป็นตัวเลข
    });
  };


  // ฟังก์ชันสำหรับจัดการเมื่อผู้ใช้คลิกเลือกวันที่ในปฏิทิน
  const handleDateClick = (day) => {
    // สร้างวันที่ใหม่จากปี เดือน และวันที่ที่ผู้ใช้เลือก
    const selectedDate = new Date(year, month, day);
    // แปลงวันที่เป็นรูปแบบ string "YYYY-MM-DD"
    const dateString = selectedDate.toISOString().split('T')[0];
    // const dateString = toYMDLocal(selectedDate);
    // console.log("test:",dateString);
    
    // ถ้ากำลังเลือกวันเริ่มต้น หรือยังไม่มีวันเริ่มต้น
    if (selectingStart || !startDate) {
      setStartDate(dateString);  // ตั้งค่าวันเริ่มต้น
      setEndDate('');            // ล้างวันสิ้นสุดเดิม
      setSelectingStart(false);  // เปลี่ยนสถานะเป็นเลือกวันสิ้นสุด
    } else {
      // ถ้าวันที่เลือกมาก่อนวันเริ่มต้น ให้ตั้งเป็นวันเริ่มต้นใหม่
      if (new Date(dateString) < new Date(startDate)) {
        setStartDate(dateString);
        setEndDate('');
      } else {
        // ถ้าวันที่เลือกหลังวันเริ่มต้น ให้ตั้งเป็นวันสิ้นสุด
        setEndDate(dateString);
        setIsOpen(false);          // ปิดปฏิทิน
        setSelectingStart(true);   // รีเซ็ตสถานะเป็นเลือกวันเริ่มต้น
      }
    }
  };

  // ฟังก์ชันสำหรับเปลี่ยนเดือนในปฏิทิน (ไปข้างหน้าหรือข้างหลัง)
  const navigateMonth = (direction) => {
    // สร้างวันที่ใหม่โดยเพิ่มหรือลบเดือน ตาม direction (1 = ถัดไป, -1 = ก่อนหน้า)
    setCurrentMonth(new Date(year, month + direction, 1));
  };

  // ฟังก์ชันสำหรับตรวจสอบว่าวันที่นั้นอยู่ในช่วงที่เลือกหรือไม่
  const isDateInRange = (day) => {
    // ถ้าไม่มีวันเริ่มต้น ให้คืนค่า false
    if (!startDate) return false;
    // สร้างวันที่จากปี เดือน และวันที่ปัจจุบันในลูป
    const date = new Date(year, month, day);
    // สร้างวันที่เริ่มต้นจาก string
    const start = new Date(startDate);
    // สร้างวันที่สิ้นสุดจาก string (หรือ null ถ้าไม่มี)
    const end = endDate ? new Date(endDate) : null;
    
    // ถ้ามีทั้งวันเริ่มต้นและวันสิ้นสุด
    if (end) {
      // ตรวจสอบว่าวันที่อยู่ระหว่างวันเริ่มต้นและวันสิ้นสุด (รวมทั้งสองวัน)
      return date >= start && date <= end;
    }
    // ถ้ามีเฉพาะวันเริ่มต้น ตรวจสอบว่าเป็นวันเดียวกันหรือไม่
    return date.toDateString() === start.toDateString();
  };

  // ฟังก์ชันสำหรับตรวจสอบว่าวันที่นั้นถูกเลือกเป็นวันเริ่มต้นหรือวันสิ้นสุดหรือไม่
  const isDateSelected = (day) => {
    // แปลงวันที่เป็น string รูปแบบ "YYYY-MM-DD"
    const date = new Date(year, month, day).toISOString().split('T')[0];
    // เปรียบเทียบกับวันเริ่มต้นและวันสิ้นสุดที่เก็บไว้
    return date === startDate || date === endDate;
  };

  // ฟังก์ชันสำหรับกำหนด CSS classes สำหรับแต่ละวันในปฏิทิน
  const getDayClasses = (day) => {
    // classes พื้นฐานที่ใช้กับวันทุกวัน
    const baseClasses = 'w-8 h-8 flex items-center justify-center text-sm cursor-pointer rounded-md transition-colors';
    
    // ถ้าวันนี้ถูกเลือกเป็นวันเริ่มต้นหรือวันสิ้นสุด
    if (isDateSelected(day)) {
      // ใช้สีน้ำเงินเข้มกับข้อความสีขาว
      return `${baseClasses} bg-blue-600 text-white`;
    }
    
    // ถ้าวันนี้อยู่ในช่วงที่เลือก
    if (isDateInRange(day)) {
      // ใช้สีน้ำเงินอ่อนกับข้อความสีน้ำเงินเข้ม
      return `${baseClasses} bg-blue-100 text-blue-900`;
    }
    
    // ถ้าเป็นวันธรรมดา ให้ใช้ hover effect เป็นสีเทาอ่อน
    return `${baseClasses} hover:bg-gray-100`;
  };

  // ฟังก์ชันสำหรับสร้างและแสดงวันที่ทั้งหมดในปฏิทิน
  const renderCalendarDays = () => {
    const days = [];
    
    // สร้างช่องว่างสำหรับวันก่อนวันที่ 1 ของเดือน
    // เพื่อให้วันที่ 1 แสดงในตำแหน่งวันที่ถูกต้องในสัปดาห์
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    
    // สร้างช่องสำหรับวันที่ทั้งหมดในเดือน (1, 2, 3, ... จนถึงวันสุดท้ายของเดือน)
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={getDayClasses(day+1)}           // ใช้ classes ที่คำนวณตามสถานะของวันนั้น
          onClick={() => handleDateClick(day+1)}     // เมื่อคลิกให้เรียกฟังก์ชันจัดการ
        >
          {day}
        </div>
      );
    }
    
    // คืนค่า array ของ JSX elements ทั้งหมด
    return days;
  };

  return (
    <div className="relative">
      {/* Input Field */}
      <div 
        className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-gray-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="flex-1 text-sm text-gray-500">
          {startDate && endDate 
            ? `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)}`
            : startDate 
            ? `${formatDateDisplay(startDate)} - วันที่สิ้นสุด`
            : 'ค้นหา การจองจากช่วงวันที่'
          }
        </span>
      </div>

      {/* ส่วนของ Calendar Dropdown - ปฏิทินที่แสดงเมื่อเปิด */}
      {isOpen && (
        <div className="absolute top-full mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-80">
          {/* ส่วนหัวข้อของปฏิทิน - แสดงเดือนปี และปุ่มเปลี่ยนเดือน */}
          <div className="flex items-center justify-between mb-4">
            {/* ปุ่มไปเดือนก่อนหน้า */}
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {/* แสดงชื่อเดือนและปี */}
            <span className="font-medium">
              {monthNames[month]} {year}
            </span>
            
            {/* ปุ่มไปเดือนถัดไป */}
            <button
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* ส่วนแสดงชื่อวันในสัปดาห์ (Su, Mo, Tu, ...) */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* ส่วนแสดงวันที่ทั้งหมดในปฏิทิน */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>

          {/* ส่วนท้ายของปฏิทิน - แสดงสถานะและปุ่มล้างข้อมูล */}
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
            {/* แสดงข้อความบอกสถานะว่ากำลังเลือกวันไหน */}
            <span className="text-xs text-gray-500">
              {selectingStart ? 'Select start date' : 'Select end date'}
            </span>
            {/* ปุ่มล้างข้อมูลที่เลือกทั้งหมด */}
            <button
              onClick={() => {
                setStartDate('');           // ล้างวันเริ่มต้น
                setEndDate('');             // ล้างวันสิ้นสุด
                setSelectingStart(true);    // รีเซ็ตสถานะเป็นเลือกวันเริ่มต้น
              }}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;