import style from "./Card.module.css"

const Card = (props) => {

    return(
        <div className={style.container} >
            <img src={props.imagen} alt={props.nombre} />
            <p>Nombre: {props.nombre}</p>
            <p>Tipo: {props.tipo}</p>
        </div>
    )
}

export default Card