import SidebarAdmin from "../components/Admin/SidebarAdmin";
import HeaderAdmin from "../components/Admin/HeaderAdmin";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminVerify = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [reserve, setReserve] = useState([]);
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchReserve = async(status="collected") => {
      try {
        const query = new URLSearchParams();
        if(status) query.set("status",status);
        const url = `${apiUrl}/api/admin/reserve${
        query.toString() ? `?${query.toString()}` : ""
      }`;
      // console.log("fetching from:", url);
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      if(res.ok){
        const data = await res.json();
        console.log("debug data",data)
        setReserve(data.result);
      }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดกับเซิรฟ์เวอร์",error);
      }
    }
    fetchReserve("collected")
  },[])

  return (
    <div className="flex min-h-screen">
      {isSidebarOpen && <SidebarAdmin />}
      <div className="flex flex-col flex-1">
        <HeaderAdmin onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {/* Content */}
        <main className="flex-1 bg-white p-6">
          <h2 className="text-2xl font-bold text-start mb-6">
            Verification & Transfer Queue
          </h2>

          {/* ตารางแสดงรายการรอตรวจสอบ */}
          <section className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
            <div className="min-w-[800px]">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-[#5D866C] text-white font-semibold">
                  <tr>
                    <th className="px-4 py-3">รหัสการจอง</th>
                    <th className="px-4 py-3">ชื่อลูกค้า</th>
                    <th className="px-4 py-3">ประเภทขยะ</th>
                    <th className="px-4 py-3">น้ำหนัก (กก.)</th>
                    <th className="px-4 py-3 hidden sm:table-cell">
                      วันที่เก็บ
                    </th>
                    <th className="px-4 py-3">ยอดเงิน (บาท)</th>
                    <th className="px-4 py-3 hidden md:table-cell text-center">
                      สถานะ
                    </th>
                    <th className="px-4 py-3 text-center">ดำเนินการ</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {reserve.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.res_code}
                      </td>
                      <td className="px-4 py-3">{item.customers_name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">{item.res_weight}</td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        {item.date}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {item.res_amount}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-center">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                          {item.res_status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button 
                        onClick={()=>{navigate(`/admin/verify/${item.res_id}`)}}
                        className="text-green-600 hover:text-green-800 font-medium text-sm">
                          ตรวจสอบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default AdminVerify;
