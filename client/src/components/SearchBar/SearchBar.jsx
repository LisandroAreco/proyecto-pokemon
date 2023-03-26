import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const SearchBar = () => {
    const [pokemon, setPokemon] = useState("")
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setPokemon(event.target.value)
    }

    const handleClick = () => {
        dispatch(getPokemonByName(pokemon))
    }

    return(
        <div>
            <input type="search" placeholder="PokeSearch!" value={pokemon} onChange={handleChange} />
            <button onClick={handleClick}></button>
        </div>
    )
}

export default SearchBar