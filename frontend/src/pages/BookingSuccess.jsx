import Header from "../components/Core-UI/Header";
import Footer from "../components/Core-UI/Footer";
import { data, Link, useParams } from "react-router-dom";
import { useEffect,useState } from "react";

const BookingSuccess = () => {
  const booking = {
    items: [
      { name: "Plastic PET", qty: 2.7, unit: "กก.", price: 11, total: 29.7 },
      { name: "Bottle Glass", qty: 2.7, unit: "กก.", price: 11, total: 59.4 },
    ],
  };

  const { resId } = useParams();
  const [bookings, setBookig] = useState({});
  const address = {
    addressLine1:` ${bookings.add_province}  ${bookings.add_district}  ${bookings.add_subdistrict} `,
    addressLine2:`${bookings.add_houseno} ${bookings.add_road} ${bookings.add_postcode}`,
  }

  useEffect(()=> {
    getBookingData();
  },[])

  
  const getBookingData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/reserve/${resId}`,{
        method:"GET",
        credentials:"include"
      });

      if(response.ok){
        const data = await response.json();
        console.log("Booking Data: ",data.result);
        setBookig(data.result);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์",error)
    }
  }

  // ฟังก์ชั่นสำหรับจัดรูปแบบวันที่ toLocaleDateString()
  const formatDateString = () => {
  const date = bookings.res_booking_date;
  if (!date) return "ไม่มีข้อมูลวันที่จอง";
  
  // ถ้าใช้ "th-TH" → จะได้เป็น 15/08/2568 (พ.ศ.)
  const formattedDate = new Date(date).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};


  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-100 flex items-start sm:items-center justify-center p-4">
        <section className="w-full max-w-xl">
          
          {/* success badge – gradient + ring + glow */}
          <div className="relative mx-auto mb-4 grid h-20 w-20 place-items-center ">
            {/* halo ping */}
            <span className="absolute h-full w-full rounded-full bg-emerald-300/30 animate-ping" />
            {/* outer ring */}
            <div className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 ring-8 ring-emerald-50 shadow-[0_10px_30px_rgba(16,185,129,0.25)]">
              {/* inner solid circle */}
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[#39B54A] text-white">
                <svg viewBox="0 0 24 24" className="h-8 w-8">
                  <path
                    d="M7 12l3 3 7-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Head */}
          <h1 className="text-center text-2xl font-semibold text-neutral-800">
            การจองสำเร็จ
          </h1>

          {/* card */}
          <div className="mt-4 rounded-2xl bg-white p-6 shadow">
            {/* booking meta (CSS Grid) */}
            <div className="grid gap-y-2 grid-cols-[11rem_1fr] sm:grid-cols-[11rem_1fr]">
              <span className="font-semibold text-neutral-800">
                หมายเลขการจอง
              </span>
              <span className="text-right text-neutral-700 break-words">
                {bookings.res_code}
              </span>

              <span className="font-semibold text-neutral-800">ชื่อ</span>
              <span className="text-right text-neutral-700 break-words">
                {bookings.cus_fname} {bookings.cus_lname}
              </span>

              <span className="font-semibold text-neutral-800">
                เบอร์โทรศัพท์
              </span>
              <span className="text-right text-neutral-700 break-words">
                {bookings.cus_phone}
              </span>

              <span className="font-semibold text-neutral-800">ที่อยู่</span>
              <span className="text-right text-neutral-700 whitespace-pre-line break-words">
                {`${address.addressLine1}\n${address.addressLine2}`}
              </span>

              <span className="font-semibold text-neutral-800">วันที่จอง</span>
              <span className="text-right text-neutral-700 break-words">
                {formatDateString()}
              </span>

              <span className="font-semibold text-neutral-800">รอบที่จอง</span>
              <span className="text-right text-neutral-700 break-words">
                {bookings.res_time_slot}
              </span>
            </div>

            <hr className="my-4 border-dashed" />

            {/* table */}
            <h2 className="mb-2 text-sm font-semibold text-neutral-800">
              รายละเอียดการจอง
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-neutral-600">
                    <th className="py-2">ประเภทขยะรีไซเคิล</th>
                    <th className="py-2">จำนวน (กก.)</th>
                    <th className="py-2">ราคาต่อหน่วย</th>
                    <th className="py-2">ราคารวม</th>
                  </tr>
                </thead>
                <tbody className="[&>tr:not(:last-child)]:border-b [&>tr:not(:last-child)]:border-neutral-200">
                  {booking.items.map((it, i) => (
                    <tr key={i}>
                      <td className="py-2">{it.name}</td>
                      <td className="py-2">{it.qty}</td>
                      <td className="py-2">{it.price} บาท</td>
                      <td className="py-2">{it.total} บาท</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2 font-semibold">รวม</td>
                    <td className="py-2 font-semibold">{bookings.res_weight} กก.</td>
                    <td className="py-2"></td>
                    <td className="py-2 font-semibold">{bookings.res_amount} บาท</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* actions */}
            <div className="mt-6 text-center  sm:flex-row sm:justify-between">
              <span className="">
                ไปที่หน้า
                <Link
                  to={"#"}
                  className="pl-2  text-[#349A2D] font-semibold hover:underline"
                >
                  ติดตามสถานะ
                </Link>
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BookingSuccess;
