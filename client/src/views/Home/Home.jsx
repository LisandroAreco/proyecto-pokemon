import CardsContainer from "../../components/CardsContainer/CardsContainer"
/* import SearchBar from "../../components/SearchBar/SearchBar"*/
import style from "./Home.module.css"

const Home =  () => {

    return(   
        <div className={style.contenedor}>
            {/* <SearchBar/> */}
            <CardsContainer/>
        </div>
    )
}

export default Home