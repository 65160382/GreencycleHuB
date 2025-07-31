import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Guest from "./pages/Guest";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Reserve from "./pages/Reserve";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Guest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reserve" element={<Reserve />} />
          {/* <Route path="/image-processing" element={<Imagemodal setIsOpen={true}/>} /> */}
        </Routes>
        {/* ตั้งค่า toastcotainer สำหรับการแจ้งเตือน */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
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
