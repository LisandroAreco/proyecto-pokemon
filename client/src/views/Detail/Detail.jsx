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
    const error = useSelector(state => state.error)
    
    return (
        <div className={style.container}>
            {Object.keys(pokemon).length
            ? 
            <div className={style.pokemon_card} key={pokemon.id}>
                <p>ID: {pokemon.id}</p>
                <p className={style.nombre}>{pokemon.nombre}</p>
                <img src={pokemon.imagen} alt={pokemon.nombre} />
                <div className={style.properties_container}>
                    <p>Vida: {pokemon.vida}</p>
                    <p>Ataque: {pokemon.ataque}</p>
                    <p>Defensa: {pokemon.defensa}</p>
                    {pokemon.velocidad && <p>Velocidad: {pokemon.velocidad}</p>}
                    {pokemon.altura && <p>Altura: {pokemon.altura}</p>}
                    {pokemon.peso && <p>Peso: {pokemon.peso}</p>}
                    {(pokemon.tipo && <p>Tipo: {pokemon.tipo?.join(" ")}</p>) || <p>tipo: {pokemon.types?.map(tipo => (tipo.nombre + " " ))}</p>}
                </div>
            </div>
            : <h1>{error}</h1>
            }   
        </div>
    )

}

export default Detail