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
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>อีเมล</label>
        <input
          type="email"
          className="email"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)} //เมื่อมีการเปลี่ยนแปลงใน input จะเรียกใช้ฟังก์ onUsernamechange แล้วส่งค่าใน input.value ไปให้
          required
        ></input>
        {error?.email && <p className="error-message">{error.email}</p>}
      </div>
      <div className="form-group">
        <label>รหัสผ่าน</label>
        <input
          type="password"
          className="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
        ></input>
        {error?.password && <p className="error-message">{error.password}</p>}
      </div>
      <div className="form-group">
        <button type="submit">เข้าสู่ระบบ</button>
      </div>
    </form>
  );
};

export default LoginForm;
