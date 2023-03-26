import Card from "../Card/Card"
import Paginado from "../Paginado/Paginado"
import style from "./CardsContainer.module.css"
import Charizard from "./Charizard.gif"
import Loading from "./loading.gif"
import { filterByType, filterByCreated } from "../../redux/actions"

import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"


const CardsContainer = () => {
    
    const dispatch = useDispatch()
    const pokemons = useSelector(state=> state.pokemons)
    const types = useSelector(state=> state.types)

    const [currentPage,setCurrentPage] = useState(1)
    const [pokemonsPerPage, setpokemonsPerPage] = useState(12)
    const indexOfLastpokemon = currentPage * pokemonsPerPage
    const indexOfFirstpokemon = indexOfLastpokemon - pokemonsPerPage
    const currentPokemons = pokemons.slice(indexOfFirstpokemon, indexOfLastpokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const typeFilterHandler = (e) => {
        dispatch (filterByType(e.target.value))
    }
    const createdFilterHandler = e => {
        dispatch(filterByCreated(e.target.value))
    }

    return(
        <div>
            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>

                <select onChange={e => typeFilterHandler(e)}>
                    <option value="todos">todos</option>
                    {types.map(type => {
                        return (
                            <option key={type.id} value={type.nombre}>{type.nombre}</option>
                        )
                    })}
                    
                </select>

                <select onChange={e => createdFilterHandler(e)}>
                    <option value="todos">todos</option>
                    <option value="true">creados</option>
                    <option value="false">preexistentes</option>
                </select>

                <Paginado
                    pokemonsPerPage = {pokemonsPerPage}
                    pokemons = {pokemons.length}
                    paginado = {paginado}
                />
            </div>

            {!pokemons.length && <div><img src={Charizard} alt={"charizard"}/> <img src={Loading} alt={"charizard"}/></div>}

            <div className={style.container}> 
                {currentPokemons?.map(poke =>{ 

                    return (
                    <Link  key={poke.id} to={`/detail/${poke.id}`}> 
                        <Card
                        key={poke.id}  
                        id={poke.id}
                        nombre={poke.nombre}
                        imagen={poke.imagen}
                        vida={poke.vida}
                        ataque={poke.ataque}
                        defensa={poke.defensa}
                        velocidad={poke.velocidad}
                        altura={poke.altura}
                        peso={poke.peso}
                        tipo={poke.tipo/* .toString() */}
                        created={poke.created}  
                        />
                    </Link>)
                })}
            </div>
        </div>
    )
}

export default CardsContainer