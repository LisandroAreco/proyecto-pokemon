import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
import logo from "./logo.png"
import create from "./create.png"

const NavBar = () => {
    return (
        <div className={style.container}>
            <Link to="/home"><img className={style.image} src={logo}/></Link>
            <Link to="/create"><img className={style.form} src={create} /></Link>
        </div>
    )
}

export default NavBar