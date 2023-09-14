import style from "./Navbar.module.css"
import fdlogo from "../../assets/images/famous-daves-logo.png"
import  {Link} from 'react-router-dom'
export default function Navbar() {
  return (
    <nav className="">
      <Link to="/" className={style.logo}>
        <img src={fdlogo} alt="famous daves logo" />
        Catering
      </Link>
      <div className={style.navlinks}>
        <div className={style.navContainer}>
        <Link to="/">Menu</Link>
        <Link to="/orders">Orders</Link>
        </div>
      </div>
    </nav>
  )
}
