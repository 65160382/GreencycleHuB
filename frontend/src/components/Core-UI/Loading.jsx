// components/Core-UI/Loading.jsx
const Loading = ({ label = "กำลังโหลด..." }) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex items-center gap-4 rounded-2xl bg-white/90 px-6 py-5 shadow-xl">
        {/* วงกลมหมุนแบบเรียบหรู */}
        <span className="relative inline-flex">
          {/* แสงเรืองนิด ๆ */}
          <span className="absolute inset-0 rounded-full bg-emerald-300/50 blur-md"></span>
          {/* วงล้อ */}
          <span
            className="relative h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-emerald-500"
            aria-hidden="true"
          />
        </span>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-neutral-800">{label}</p>
          <p className="text-xs text-neutral-500">โปรดรอสักครู่…</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
