import { IoCloseCircle } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

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

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  widthClass = "max-w-2xl",
}) => {
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
            <div
              className={`w-full ${widthClass} rounded-lg bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto relative`}
            >
              <section className="flex items-start justify-between">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {title}
                </h2>
                <IoCloseCircle
                  className="w-9 h-9 cursor-pointer text-gray-500 hover:text-red-500 transform hover:scale-110 transition-transform duration-200"
                  onClick={onClose}
                />
              </section>

              <section className="mt-4">{children}</section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
