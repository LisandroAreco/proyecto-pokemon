import axios from "axios"
import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getPokemon, getTypes } from "../../redux/actions"

const Detail = () => {
    const {id} =  useParams()
    const dispatch = useDispatch()

    useEffect( ()  => {
        //dispatch(getTypes())
        dispatch(getPokemon(id))
    },[id])
    const pokemon = useSelector(state => state.pokemons)



    return(

        <div key={pokemon.id}>
            <p>id: {pokemon.id}</p>
            <p>nombre: {pokemon.nombre}</p>
            <img src={pokemon.imagen} alt={pokemon.nombre} />
            <p>vida: {pokemon.vida}</p>
            <p>ataque: {pokemon.ataque}</p>
            <p>defensa: {pokemon.defensa}</p>
            {pokemon.velocidad && <p>velocidad: {pokemon.velocidad}</p>}
            {pokemon.altura && <p>altura: {pokemon.altura}</p>}
            {pokemon.peso && <p>peso: {pokemon.peso}</p>}
            {/* <p>tipo: {pokemon.tipo.map(tipo => {
                    return  tipo
                })}</p> */}
        </div>
    )

}

export default Detail