import './Header.css';

export default function Header(){
    return(
        <header className="header">
            <nav className="logo">
                <h1>GreencycleHuB</h1>
            </nav>
            <nav className="nav-links">
                <button className="btn-login" >เข้าสู่ระบบ</button>
                <button className="btn-regis" >ลงทะเบียน</button>
            </nav>
        </header>
    )
}