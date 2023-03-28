import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getPokemon, getTypes, clearDetail } from "../../redux/actions"
import style from "./Detail.module.css"

const Detail = () => {
    const {id} =  useParams()
    const dispatch = useDispatch()

    useEffect( ()  => {
        dispatch(getTypes())
        dispatch(getPokemon(id))
       
        return () =>{
            dispatch(clearDetail)
        }
    },[dispatch, id])
    const pokemon = useSelector(state => state.details)
    console.log(pokemon);
    let tipos = "tipos"
    return(

        <div className={style.pokemon_card} key={pokemon.id}>
            <p>id: {pokemon.id}</p>
            <p>nombre: {pokemon.nombre}</p>
            <img src={pokemon.imagen} alt={pokemon.nombre} />
            <p>vida: {pokemon.vida}</p>
            <p>ataque: {pokemon.ataque}</p>
            <p>defensa: {pokemon.defensa}</p>
            {pokemon.velocidad && <p>velocidad: {pokemon.velocidad}</p>}
            {pokemon.altura && <p>altura: {pokemon.altura}</p>}
            {pokemon.peso && <p>peso: {pokemon.peso}</p>}
            {(pokemon.tipo && <p>tipo: {pokemon.tipo?.join(" ")}</p>) || <p>tipo: {pokemon.types?.map(tipo => (tipo.nombre + " " ))}</p>}
        </div>
    )

}

export default Detail