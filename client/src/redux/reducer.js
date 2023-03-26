import { GET_POKEMONS,GET_POKEMON, GET_TYPES, CLEAR_DETAIL, GET_POKEMON_BY_NAME, FILTER_BY_TYPE, FILTER_BY_CREATED } from "./actions"
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
            const filteredByType = action.payload === "todos"? allPokemons : allPokemons.filter(poke => poke.tipo.includes(action.payload))
            return {...state, pokemons: filteredByType}
        case FILTER_BY_CREATED:
            console.log(action.payload);
            console.log(allPokemons)
            const filterByCreated = action.payload === "todos"? allPokemons : allPokemons.filter(poke => poke.created === action.payload)
            return{...state, pokemons: filterByCreated}
        default:
            return {...state}
    }
}
export {
    rootReducer
}