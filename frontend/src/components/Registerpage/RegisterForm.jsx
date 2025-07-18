const RegisterForm = ({
  email,
  password,
  firstname,
  lastname,
  onEmailChange,
  onPasswordChange,
  onFirstnameChange,
  onLastnameChange,
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // ป้องกันไม่ให้โหลดหน้าเว็บใหม่
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-2.5 ">
        <label className="block text-gray-700 font-medium mb-1">ชื่อจริง</label>
        <input
          type="text"
          placeholder="ชื่อจริง"
          value={firstname}
          onChange={(e) => onFirstnameChange(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="p-2.5 ">
        <label className="block text-gray-700 font-medium mb-1">นามสกุล</label>
        <input
          type="text"
          placeholder="นามสกุล"
          value={lastname}
          onChange={(e) => onLastnameChange(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="p-2.5 ">
        <label className="block text-gray-700 font-medium mb-1">อีเมล</label>
        <input
          type="email"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="p-2.5 ">
        <label className="block text-gray-700 font-medium mb-1">รหัสผ่าน</label>
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="p-2.5 ">
        <button
          type="submit"
          className="w-full bg-[#b9ff66] text-black py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-[#a3e957]"
        >
          ลงทะเบียนเข้าสู่ระบบ
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
