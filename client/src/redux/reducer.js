import { GET_POKEMONS,GET_POKEMON, GET_TYPES, CLEAR_DETAIL, GET_POKEMON_BY_NAME, FILTER_BY_TYPE, FILTER_BY_CREATED, filterByType } from "./actions"
let initialState = {
    pokemons: [],
    allPokemons: [],
    details: [],
    types: [],

}

const rootReducer = (state = initialState , action) => {
    const allPokemons = state.allPokemons

    switch(action.type){
        case GET_POKEMONS:
            return {...state, allPokemons: action.payload, pokemons : action.payload}
        case GET_POKEMON:
            return {...state, details: action.payload}
        case GET_POKEMON_BY_NAME:
            return {...state,pokemons: action.payload}
        case GET_TYPES:
            return {...state, types: action.payload}
        case CLEAR_DETAIL: 
            return {...state, details: action.payload}
        case FILTER_BY_TYPE:
            let filteredByType = action.payload === "todos"? allPokemons : allPokemons.filter(poke => poke.tipo.includes(action.payload))
             !filteredByType.length && (filteredByType =   ["no hay pokemones de ese tipo"] ) 
            return {...state, pokemons: filteredByType}     
        case FILTER_BY_CREATED:
            const filterByCreated = action.payload === "todos"? allPokemons : allPokemons.filter(poke => poke.created === action.payload)
            return{...state, pokemons: filterByCreated}
        default:
            return {...state}
    }
}
export {
    rootReducer
}