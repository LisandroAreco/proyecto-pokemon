import Card from "../Card/Card"
import Paginado from "../Paginado/Paginado"
import style from "./CardsContainer.module.css"
import Charizard from "./Charizard.gif"
import Loading from "./loading.gif"


import { useSelector } from "react-redux"
import { useState } from "react"


const CardsContainer = () => {

    const pokemons = useSelector(state=> state.pokemons)
    const [currentPage,setCurrentPage] = useState(1)
    const [pokemonsPerPage, setpokemonsPerPage] = useState(12)
    const indexOfLastpokemon = currentPage * pokemonsPerPage
    const indexOfFirstpokemon = indexOfLastpokemon - pokemonsPerPage
    const currentPokemons = pokemons.slice(indexOfFirstpokemon, indexOfLastpokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return(
        <div>
            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select>
                    <option value="todos">todos</option>
                    <option value="creados">creados</option>
                    <option value="Bddatos">basededatos</option>
                </select>
                <Paginado
                    pokemonsPerPage = {pokemonsPerPage}
                    pokemons = {pokemons.length}
                    paginado = {paginado}
                />
            </div>

            {!pokemons.length && <div><img src={Charizard}></img> <img src={Loading}></img></div>}

            <div className={style.container}> 
                {currentPokemons?.map(poke =>{ 

                    return <Card
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
                })}
            </div>
        </div>
    )
}

export default CardsContainer