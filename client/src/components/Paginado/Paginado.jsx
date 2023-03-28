import style from "./Paginado.module.css"
const Paginado = ({pokemonsPerPage, pokemons, paginado}) => {
    let pageNumbers = []

    for(let i= 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }
    
    return(
       
        <nav>
            <ul className={style.container_list}>
                {pageNumbers && pageNumbers.map(page =>( 
                     <li key = {page}> 
                        <button onClick={() => paginado(page)}>{page }</button> 
                     </li>
                ))}
            </ul>
        </nav>
    )
}

export default Paginado