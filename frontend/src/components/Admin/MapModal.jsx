import { IoCloseCircle } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Spinloading from "../Core-UI/Spinloading";
import { loadNostraScript, initializeMap, showError } from "../../utils/nostraMapUtils";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
};

const MapModal = ({ isOpen, onClose, lat, lon }) => {
  const apiKey = import.meta.env.VITE_NOSTRA_API_KEY;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);

    // โหลด script จาก apikey
    loadNostraScript(apiKey, () => {
      try {
        initializeMap(lat, lon); //สร้างแผนที่
        setIsLoading(false);
      } catch (error) {
        showError(error);
      } finally {
        setTimeout(() => setIsLoading(false), 300); // UX soft delay
      }
    });
  }, [isOpen, apiKey, lat, lon]);

  // console.log("test result lat , lon:",lat,lon)


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-50 flex justify-center items-start p-4 pt-16 overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && <Spinloading />}
            <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto relative">
              {/* Modal Header */}
              <section className="flex items-start justify-end ">
                <IoCloseCircle
                  className="w-9 h-9 cursor-pointer text-gray-500 hover:text-red-500 transform hover:scale-110 transition-transform duration-200"
                  onClick={onClose}
                />
              </section>

              {/* Content */}
              <section className="mt-4">
                <div id="map" className="w-full h-[400px] rounded border" />
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MapModal;
