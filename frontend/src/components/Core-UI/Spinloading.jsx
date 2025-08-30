const Spinloading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[#f3f3f3] flex items-center justify-center">
      <div className="h-12 w-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
};

export default Spinloading;
