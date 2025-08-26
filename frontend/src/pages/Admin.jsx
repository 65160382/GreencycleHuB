import { useState } from "react";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import HeaderAdmin from "../components/Admin/HeaderAdmin";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {isSidebarOpen && <SidebarAdmin />}

      <div className="flex flex-col flex-1">
        <HeaderAdmin onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 bg-white p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Welcome Admin</h2>
          {/* <div className="bg-gray-200 rounded-lg h-60 mx-auto w-3/4" /> */}
        </main>
      </div>
    </div>
  );
};

export default Admin;
