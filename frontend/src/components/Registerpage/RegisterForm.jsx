const RegisterForm = () => {
  const formdata = [
    { label: "ชื่อจริง", name: "firstname", type: "text", className: "firstname", placeholder: "ชื่อจริง" },
    { label: "นามสกุล", name: "lastname", type: "text", className: "lastname", placeholder: "นามสกุล" },
    { label: "อีเมล", name: "email", type: "email", className: "email", placeholder: "อีเมล" },
    { label: "รหัสผ่าน", name: "password", type: "password", className: "password", placeholder: "รหัสผ่าน" }
  ];

  return (
    <form>
      {formdata.map((item, index) => (
        <div className="form-group" key={index}>
          <label>{item.label}</label>
          <input
            type={item.type}
            name={item.name}
            className={item.className}
            placeholder={item.placeholder}
            required
          />
        </div>
      ))}

      <div className="form-group">
        <button type="submit">ลงทะเบียนเข้าสู่ระบบ</button>
      </div>
    </form>
  );
};

export default RegisterForm;
