export default function LoginForm(){
    return(
        <form>
          <div className="form-group">
            <label>อีเมล</label>
            <input
              type="email"
              className="email"
              placeholder="อีเมล"
              required
            ></input>
          </div>
          <div className="form-group">
            <label>รหัสผ่าน</label>
            <input
              type="password"
              className="password"
              placeholder="รหัสผ่าน"
              required
            ></input>
          </div>
          <div className="form-group">
            <button type="submit">เข้าสู่ระบบ</button>
          </div>
        </form>
    )
}