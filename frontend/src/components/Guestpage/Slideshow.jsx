export default function Slideshow() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <img
        src="https://www.uarm.edu.pe/wp-content/uploads/2024/05/nota-reciclar.jpg"
        alt="รีไซเคิล"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Optional: Overlay + Text (ไว้ใส่ข้อความบนภาพได้) */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"></div> */}
    </div>
  );
}
