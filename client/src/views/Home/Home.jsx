import CardsContainer from "../../components/CardsContainer/CardsContainer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getPokemons, getTypes } from "../../redux/actions"


const Home =  () => {
    const dispatch = useDispatch()
    // para montar useo useEffect() y el useDispatch() para despachar la action 
    useEffect(() => {
        dispatch(getTypes())
        dispatch(getPokemons())
    }, [dispatch])
    return(
        
        <div>
            <CardsContainer/>
        </div>
    )
}

export default Home