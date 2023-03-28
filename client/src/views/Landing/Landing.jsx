import { Link } from "react-router-dom"
import style from "./Landing.module.css"
import meowth from "./meowth.gif"
const Landing = () => {
    return(
        <div className={style.container}>
            <Link to={"/home"}>
                <button className={style.button_start}>Ingresar</button>
            </Link>
            <img className={style.gif} src={meowth} />
        </div>
    )
}

export default Landing