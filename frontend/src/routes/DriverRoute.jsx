import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Spinloading from "../components/Core-UI/Spinloading";

const DriverRoute = ({ children }) => {
  const { user, isAuthChecked } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthChecked && (!user || user.role !== "driver")) {
      toast.warn("คุณไม่มีสิทธิ์เข้าถึง!");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  }, [isAuthChecked, user, navigate]);

  if (!isAuthChecked) {
    return <Spinloading />;
  }
  if (!user || user.role !== "driver") {
    return null;
  }

  return children;
};

export default DriverRoute;
