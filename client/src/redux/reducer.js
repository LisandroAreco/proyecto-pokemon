import { GET_POKEMONS,GET_POKEMON, GET_TYPES, CLEAR_DETAIL, GET_POKEMON_BY_NAME, FILTER_BY_TYPE, FILTER_BY_CREATED, ORDER_BY_ID, ORDER_BY_ATTACK, RESET_POKEMONS,RESET_FILTERS, ERRORS } from "./actions"
let initialState = {
    pokemons: [],
    allPokemons: [],
    details: [],
    types: [],
    filtered: [],
    error: ""

}

const rootReducer = (state = initialState , action) => {
    const allPokemons = state.allPokemons
    let filtered = state.filtered
    const pokemons = state.pokemons
    let errorMsj = ""

    switch(action.type){
        case GET_POKEMONS:
            return {...state, allPokemons: action.payload, pokemons : action.payload, filtered: action.payload, error:""}
        case GET_POKEMON:
            console.log(typeof action.payload === 'object');
            if(typeof action.payload === "string")return {...state, error:action.payload}
            else  return {...state, details: action.payload, error:""}

            // return {...state, details: action.payload, error:""}
        case GET_POKEMON_BY_NAME:
            return {...state, pokemons: action.payload, error:""}
        case GET_TYPES:
            return {...state, types: action.payload}
        case CLEAR_DETAIL: 
            return {...state, details: action.payload}
        case FILTER_BY_TYPE:
            let filteredByType = (action.payload === "todos")
            ? filtered 
            : filtered.filter(poke => poke.tipo.includes(action.payload))

            // !filteredByType.length && (filteredByType =   ["no hay pokemones de ese tipo"] ) 
            !filteredByType.length && (errorMsj = "No hay pokemones con ese filtro")
            filteredByType.length && (errorMsj = "" )
            return {...state,  pokemons: filteredByType,  error: errorMsj}    
             
        case FILTER_BY_CREATED:
            let filterByCreated = []
            if(action.payload === "todos") filterByCreated =  allPokemons
            if(action.payload === "true")filterByCreated = allPokemons.filter(poke => poke.created === action.payload)
            if(action.payload === "false")filterByCreated = allPokemons.filter(poke => poke.created === action.payload)

            !filterByCreated?.length && (errorMsj = "No hay pokemones con ese filtro")
            filterByCreated?.length && (errorMsj = "" )
            return{...state, pokemons: filterByCreated, filtered: filterByCreated, error: errorMsj}

        case ORDER_BY_ID: 
            let orderedIdPokemons = action.payload === "asc"
            ? pokemons.sort((a,b) => a.id - b.id )              
            : pokemons.sort((a,b) => b.id - a.id )

            return {...state, pokemons: orderedIdPokemons}
        case ORDER_BY_ATTACK: 
            let orderedAttPokemons = action.payload === "ascAtt"
            ? pokemons.sort((a,b) => a.ataque - b.ataque )              
            : pokemons.sort((a,b) => b.ataque - a.ataque )
            
            return {...state, pokemons: orderedAttPokemons}
        case RESET_POKEMONS:
            return{...state,pokemons: action.payload}
        case RESET_FILTERS:
            return{...state,pokemons: allPokemons, error: ""}
        case ERRORS:
            return{...state, error: action.payload}
        default:
            return {...state}
    }
}
export {
    rootReducer
}