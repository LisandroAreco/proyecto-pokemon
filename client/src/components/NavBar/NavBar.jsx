import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
import logo from "./logo.png"
import create from "./create.png"
import { useDispatch } from "react-redux"
import { getPokemons, resetPokemons } from "../../redux/actions"

const NavBar = () => {
    const dispatch = useDispatch()
    const clickHandler = () => {
        dispatch(resetPokemons())
        dispatch(getPokemons())    
    }

    return (
        <div className={style.container}>
            <Link to="/home" onClick={() => clickHandler()}><img className={style.image} src={logo}/></Link>
            <Link to="/create"><img className={style.form} src={create} /></Link>
        </div>
    )
}

export default NavBar