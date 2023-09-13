import style from "./Navbar.module.css"
import fdlogo from "../../assets/images/famous-daves-logo.png"

export default function Navbar() {
  return (
    <nav className="">
      <a href="/" className={style.logo}>
        <img src={fdlogo} alt="fd" />
        Catering
      </a>
      <div className={style.navlinks}>
        <div className={style.navContainer}>
        <a href="/">Menu</a>
        <a href="/orders">Orders</a>
        </div>
      </div>
    </nav>
  )
}