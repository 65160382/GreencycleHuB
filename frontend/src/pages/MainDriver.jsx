import HeaderAdmin from "../components/Admin/HeaderAdmin"
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import { useState } from "react"
import  { DriverCalendar } from "../components/Driver/DriverCalendar";

const MainDriver = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex min-h-screen">
      {isSidebarOpen && <SidebarAdmin />}

      <div className="flex flex-col flex-1">
        <HeaderAdmin onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
        <main className="flex-1 bg-white p-4">
          {/* <h2 className="text-2xl font-bold text-center mb-6">Welcome Driver{""}</h2> */}
          <DriverCalendar/>
        </main>
      </div>
    </div>
  )
}

export default MainDriver