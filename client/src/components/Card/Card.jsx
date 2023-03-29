import style from "./Card.module.css"

const Card = (props) => {

    return(
        <div className={style.container} >
            <img className={style.img} src={props.imagen} alt={props.nombre} />
            <p>{props.nombre}</p>
            <p>Tipo: {props.tipo?.join(" ")}</p>
        </div>
    )
}

export default Card