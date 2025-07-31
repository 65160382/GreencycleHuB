import  { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const PersonalComponent = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {/* กล่องฟอร์มแบบ responsive */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-3 md:space-y-0">
        {/* ฟิลด์ชื่อ - นามสกุล */}
        <div className="flex flex-col md:flex-row md:items-center">
          <label className="mr-2.5 font-medium whitespace-nowrap">
            ชื่อ - นามสกุล
          </label>
          {/* ชื่อ-นามสกุล ที่ดึงมากจาก table customer */}
          <input
            type="text"
            value={user.fname}
            className="border border-[#D4D7E3] bg-[#F7FBFF] rounded-lg p-2 w-full md:w-60"
            disabled
          />
        </div>

        {/* ฟิลด์เบอร์โทร */}
        <div className="flex flex-col md:flex-row md:items-center">
          <label className="mr-2.5 font-medium whitespace-nowrap">
            เบอร์โทรศัพท์
          </label>
          {/* เบอร์โทรศัพท์ ที่ดึงมาจาก table customer */}
          <input
            type="text"
            value={" "}
            className="border border-[#D4D7E3] bg-[#F7FBFF] rounded-lg p-2 w-full md:w-60"
            disabled
          />
        </div>
      </div>
    </>
  );
};

export default PersonalComponent;
