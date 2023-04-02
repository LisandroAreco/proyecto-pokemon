import style from "./Paginado.module.css"
const Paginado = ({pokemonsPerPage, pokemons, paginado, currentPage, setCurrentPage}) => {
    let pageNumbers = []

    for(let i= 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    
    return(
       
        <nav>

            <ul className={style.container_list}>
                {currentPage === 1
                ?   <li>
                        <button disabled="true"> &lt; </button>
                    </li>
                :   <li>
                        <button  onClick={() => paginado(currentPage - 1)}> &lt;</button>
                    </li>}
                
                {pageNumbers && pageNumbers.map(page =>( 
                     <li key = {page}> 
                        <button onClick={() => paginado(page)}>{page }</button> 
                     </li>
                ))}

                {currentPage === Math.ceil(pokemons / pokemonsPerPage)
                ?   <li>
                        <button disabled="true" >&gt;</button>
                    </li>
                :   <li>
                        <button  onClick={() => paginado(currentPage + 1)}>&gt;</button>
                    </li>}
            </ul>
        </nav>
    )
}

export default Paginado