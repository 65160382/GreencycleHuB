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
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>ชื่อจริง</label>
        <input
          type="text"
          className="firstname"
          placeholder="ชื่อจริง"
          value={firstname}
          onChange={(e) => onFirstnameChange(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>นามสกุล</label>
        <input
          type="text"
          className="lastname"
          placeholder="นามสกุล"
          value={lastname}
          onChange={(e) => onLastnameChange(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>อีเมล</label>
        <input
          type="email"
          className="email"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
        />
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
        />
      </div>

      <div className="form-group">
        <button type="submit">ลงทะเบียนเข้าสู่ระบบ</button>
      </div>
    </form>
  );
};

export default RegisterForm;
