// รับค่า state ที่ส่งมาจาก component แม่
const LoginForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  error,
}) => {
  // ฟังก์ชั่นจักการการส่งข้อมูลใน form
  const handleSubmit = (e) => {
    e.preventDefault();
    // setError("");
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className="form-group">
        <label className="block text-gray-700 font-semibold mb-2">อีเมล</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)} //เมื่อมีการเปลี่ยนแปลงใน input จะเรียกใช้ฟังก์ onUsernamechange แล้วส่งค่าใน input.value ไปให้
          required
        ></input>
        {error?.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
      </div>
      <div className="form-group">
        <label className="block text-gray-700 font-semibold mb-2">รหัสผ่าน</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
        ></input>
        {error?.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
      </div>
      <div className="form-group">
        <button  type="submit" className="w-full text-black py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">เข้าสู่ระบบ</button>
      </div>
    </form>
  );
};

export default LoginForm;
