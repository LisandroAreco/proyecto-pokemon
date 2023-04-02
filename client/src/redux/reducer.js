import { GET_POKEMONS,GET_POKEMON, GET_TYPES, CLEAR_DETAIL, GET_POKEMON_BY_NAME, FILTER_BY_TYPE, FILTER_BY_CREATED, ORDER_BY_ID, ORDER_BY_ATTACK, RESET_POKEMONS } from "./actions"
let initialState = {
    pokemons: [],
    allPokemons: [],
    details: [],
    types: [],
    filtered: []

}

const rootReducer = (state = initialState , action) => {
    const allPokemons = state.allPokemons
    let filtered = state.filtered
    const pokemons = state.pokemons

    switch(action.type){
        case GET_POKEMONS:
            return {...state, allPokemons: action.payload, pokemons : action.payload, filtered: action.payload}
        case GET_POKEMON:
            return {...state, details: action.payload}
        case GET_POKEMON_BY_NAME:
            return {...state, pokemons: action.payload}
        case GET_TYPES:
            return {...state, types: action.payload}
        case CLEAR_DETAIL: 
            return {...state, details: action.payload}
        case FILTER_BY_TYPE:
            let filteredByType = action.payload === "todos"
            ? filtered 
            : filtered.filter(poke => poke.tipo.includes(action.payload))

            !filteredByType.length && (filteredByType =   ["no hay pokemones de ese tipo"] ) 
            return {...state, pokemons: filteredByType}     
        case FILTER_BY_CREATED:
            let filterByCreated = []
            if(action.payload === "todos") filterByCreated =  allPokemons
            if(action.payload === "true")filterByCreated = allPokemons.filter(poke => poke.created === action.payload)
            if(action.payload === "false")filterByCreated = allPokemons.filter(poke => poke.created === action.payload)

            return{...state, pokemons: filterByCreated, filtered: filterByCreated}
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
        default:
            return {...state}
    }
}
export {
    rootReducer
}