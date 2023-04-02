import { useState } from "react"
import { useDispatch } from "react-redux"
import { getPokemonByName } from "../../redux/actions"
import style from "./SearchBar.module.css"
import img from "./search.png"

const SearchBar = ({setCurrentPage}) => {
    const [pokemon, setPokemon] = useState("")
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setPokemon(event.target.value)
    }

    const handleClick = () => {
        dispatch(getPokemonByName(pokemon))
        setPokemon("")
        setCurrentPage(1)
    }

    return(
        <div className={style.search_bar}>
            <input type="search" placeholder="PokeSearch!" value={pokemon} onChange={e => handleChange(e)} />
            <button onClick={handleClick}><img src={img}></img> </button>
        </div>
    )
}

export default SearchBar