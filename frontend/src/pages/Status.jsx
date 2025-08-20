import Header from "../components/Core-UI/Header";
import Footer from "../components/Core-UI/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

const Status = () => {
  const [activeTab, setActiveTab] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");

  const tabs = ["ทั้งหมด", "รอตรวจสอบ", "สำเร็จ", "ยกเลิกแล้ว"];

  // mock ข้อมูลการจอง (จริง ๆ จะ fetch จาก API)
  const reservations = [
    {
      id: "123xxxxx",
      name: "นายปิยะวัฒน์ สีปัดถา",
      date: "19/8/2568",
      time: "9.00-12.00",
      status: "ยืนยันการจอง",
    },
  ];

  return (
    <div className="bg-[#f3f3f3]">
      <Header />
      {/* Content div */}
      <div className="flex flex-col px-10 py-4">
        {/* ปุ่มกลับสู่หน้าหลัก */}
        <section className="flex m-2.5 font-medium">
          <ChevronLeft className="cursor-pointer" />
          <Link
            to={"/home"}
            className="hover:text-green-600 transition-colors cursor-pointer"
          >
            กลับสู่หน้าหลัก
          </Link>
        </section>

        {/* header */}
        <div className="min-h-screen bg-gray-50 p-4">
          {/* Tabs */}
          <div className="flex border-b mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium text-sm border-b-2 ${
                  activeTab === tab
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="ค้นหา"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          {/* List */}
          <div className="space-y-3">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="flex items-start gap-4 rounded-md border bg-white p-4 shadow-sm"
              >
                {/* Placeholder image */}
                <div className="h-20 w-20 rounded-md bg-gray-200" />

                <div className="flex-1 text-sm">
                  <p className="font-medium text-gray-800">
                    หมายเลขการจอง {res.id}
                  </p>
                  <p>ชื่อ {res.name}</p>
                  <p>
                    วันที่จอง {res.date} รอบ {res.time}
                  </p>
                  <p className="text-gray-600">สถานะ: {res.status}</p>
                </div>

                <button className="shrink-0 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200">
                  ดูรายละเอียด
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Status;
