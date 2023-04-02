import Card from "../Card/Card"
import SearchBar from "../SearchBar/SearchBar"
import Paginado from "../Paginado/Paginado"
import style from "./CardsContainer.module.css"
import Charizard from "./Charizard.gif"
import Loading from "./loading.gif"
import { filterByType, filterByCreated, orderById, orderByAttack } from "../../redux/actions"
import { getPokemons, getTypes } from "../../redux/actions"


import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"


const CardsContainer = () => {


    const pokemons = useSelector(state=> state.pokemons)
    const types = useSelector(state=> state.types)

    const [currentPage,setCurrentPage] = useState(1)
    const [render, setRender] = useState(0)
    const [pokemonsPerPage, setpokemonsPerPage] = useState(12)
    // const [typeState, setTypeState] = useState("todos")

    const indexOfLastpokemon = currentPage * pokemonsPerPage
    const indexOfFirstpokemon = indexOfLastpokemon - pokemonsPerPage
    
    const currentPokemons = pokemons?.slice(indexOfFirstpokemon, indexOfLastpokemon)
    
    const dispatch = useDispatch()
    useEffect(() => {
        if(pokemons.length > 0) setRender(1)
        else{
            dispatch(getTypes())
            dispatch(getPokemons())
            setRender(1)
        }
    }, (render !== 1))
 
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    const typeFilterHandler = (e) => {
        setCurrentPage(1)
        // setTypeState(e.target.value)
        dispatch (filterByType(e.target.value))
    }
    const createdFilterHandler = async e => {
        // hacer funcion para que filtro de tipos se vuelva a todos al cambiar entre db y preexistes

        dispatch(filterByCreated(e.target.value))
        // setTypeState("todos")
    }
    const orderHandler = (e) => {
        if(e.target.value === "asc") {
            dispatch(orderById(e.target.value))
            setCurrentPage(1)
            setRender(render +1)            
        }if(e.target.value === "desc") {
            dispatch(orderById(e.target.value))
            setCurrentPage(1)
            setRender(render +1)            
        }if(e.target.value  === "ascAtt" ) {
            dispatch(orderByAttack(e.target.value))
            setCurrentPage(1)
            setRender(render +1)            
        }if(e.target.value  === "descAtt") {
            dispatch(orderByAttack(e.target.value))
            setCurrentPage(1)
            setRender(render +1)            
        }
    }
    
    return(
        <div className={style.container}>
            <div className={style.container_nav_search}>
                    <div className={style.search_bar}>
                        <SearchBar  setCurrentPage={setCurrentPage}/>
                    </div>
                    <select className={style.first_order} onChange={e => orderHandler(e)}>
                        <option value="todos">Ordenar por</option>                    
                        <option value="asc"> ID ascendente</option>
                        <option value="desc">ID descendente</option>
                        <option value="ascAtt">Ataque ascendente</option>
                        <option value="descAtt">Ataque descendente</option>
                    </select>

                    <select className="no" onChange={e => typeFilterHandler(e)}>
                        {/* <label>Type order</label> */}
                        <option value="todos">todos</option>
                        {types.map(type => {
                            return (
                                <option key={type.id} value={type.nombre}>{type.nombre}</option>
                            )
                        })}
                        
                    </select>

                    <select className="si" onChange={e => createdFilterHandler(e)}>
                        <option value="todos">todos</option>
                        <option value="true">creados</option>
                        <option value="false">preexistentes</option>
                    </select>
                    
              
            </div>
            <div>
                <Paginado
                    pokemonsPerPage = {pokemonsPerPage}
                    pokemons = {pokemons.length}
                    paginado = {paginado}
                    setcurrentPage = {setCurrentPage}
                    currentPage = {currentPage}
                />
            </div>
            
            {!pokemons.length && 
                <div className={style.container_gifs}>
                    <img src={Charizard} className={style.charizard} alt={"charizard"}/> <img src={Loading} className={style.loading} alt={"charizard"}/>
                </div>
            }
            {/* renderiza Card o mensaje de error */}
            {(typeof pokemons[0] === "string")
                ? <div className={style.no_pokemons}><h3>{pokemons[0]}</h3></div>
                : 
                <div className={style.container_cards}> 
                {currentPokemons?.map(poke =>{ 
                    return (
                    <Link  key={poke.id} to={`/detail/${poke.id}`}> 
                        <Card
                            key={poke.id}  
                            nombre={poke.nombre}
                            imagen={poke.imagen}
                            tipo={poke.tipo}  
                        />
                    </Link>)
                })}
                </div>
            }
        </div>
    )
}

export default CardsContainer