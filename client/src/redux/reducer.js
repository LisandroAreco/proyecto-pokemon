import { GET_POKEMONS,GET_POKEMON, GET_TYPES } from "./actions"
let initialState = {
    pokemons: [],
    details: [],
    types: []
}

const rootReducer = (state = initialState , action) => {

    switch(action.type){
        case GET_POKEMONS:
            return {...state, pokemons: action.payload}
        case GET_POKEMON:
            return {...state, details: action.payload}
        case GET_TYPES:
            return {...state, types: action.payload}
        default:
            return {...state}
    }
}
export {
    rootReducer
}