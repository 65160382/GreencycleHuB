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
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        สมัครสมาชิก
      </h2>

      <div>
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

      <div>
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

      <div>
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

      <div>
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

      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
        >
          ลงทะเบียนเข้าสู่ระบบ
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
