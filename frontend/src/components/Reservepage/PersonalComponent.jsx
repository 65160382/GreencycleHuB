import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ReserveContext } from "../../context/ReserveContext";

const PersonalComponent = () => {
  const { user } = useContext(AuthContext);
  // const { personInfo, setPersonInfo} = useContext(ReserveContext);

  return (
    <>
      {/* กล่องข้อมูลลูกค้าแบบ responsive พร้อมจัดระยะห่างให้เหมาะสม */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border">
        {/* ฟิลด์ชื่อ - นามสกุล */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            ชื่อ - นามสกุล
          </label>
          <p className="text-gray-800 font-medium">
            {user.fname} {user.lname}
          </p>
        </div>

        {/* ฟิลด์เบอร์โทร */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            เบอร์โทรศัพท์
          </label>
          <p className="text-gray-800 font-medium">{user.phone}</p>
        </div>

        {/* ฟิลด์อีเมล */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">อีเมล</label>
          <p className="text-gray-800 font-medium">{user.email}</p>
        </div>
      </div>
    </>
  );
};

export default PersonalComponent;
