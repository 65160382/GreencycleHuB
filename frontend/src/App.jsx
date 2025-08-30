import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Guest from "./pages/Guest";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Reserve from "./pages/Reserve";
import { AuthProvider } from "./context/AuthProvider";
import { ReserveProvider } from "./context/ReserveProvider";
import BookingSuccess from "./pages/BookingSuccess";
import Status from "./pages/Status";
import Statusdetail from "./pages/Statusdetail";
import Admin from "./pages/Admin";
import Booking from "./components/Admin/Booking";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Guest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/reserve"
            element={
              <ReserveProvider>
                <Reserve />
              </ReserveProvider>
            }
          />
          <Route path="/booking-success/:resId" element={<BookingSuccess />} />
          <Route path="/status" element={<Status />} />
          <Route path="/status/:resId" element={<Statusdetail />} />
          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/booking"
            element={
              <AdminRoute>
                <Booking />
              </AdminRoute>
            }
          />
          {/* <Route path="/image-processing" element={<Imagemodal setIsOpen={true}/>} /> */}
        </Routes>
        {/* ตั้งค่า toastcotainer สำหรับการแจ้งเตือน */}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
