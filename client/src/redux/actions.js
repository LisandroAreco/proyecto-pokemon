import axios from "axios"


export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMON = "GET_POKEMON"
export const GET_TYPES = "GET_TYPES" 
export const CLEAR_DETAIL = "CLEAR_DETAIL"
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME"
export const FILTER_BY_TYPE = "FILTER_BY_TYPE"
export const FILTER_BY_CREATED = "FILTER_BY_CREATED"
export const ORDER_BY_ID = "ORDER_BY_ID"
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK"
export const RESET_POKEMONS = "RESET_POKEMONS"

export const getPokemons =  () => {
    return async function (dispatch) {
        const pokemons = await axios.get(`http://localhost:3001/pokemons`)
        let allPokemons = pokemons.data
        dispatch({type:GET_POKEMONS, payload:allPokemons})
    };
}

export const getPokemon =  (id) => {
    return async function (dispatch) {
        const pokemons = await axios.get(`http://localhost:3001/pokemons/${id}`)
        let pokemon = pokemons.data
        dispatch({type:GET_POKEMON, payload:pokemon})
    };
}
export const getPokemonByName =  (nombre) => {
    return async function (dispatch) {
        const pokemons = await axios.get(`http://localhost:3001/pokemons?nombre=${nombre}`)
        let pokemon = pokemons.data
        dispatch({type:GET_POKEMON_BY_NAME, payload:pokemon})
    };
}

export const getTypes = () => {
    return async function (dispatch) {
        const types = await axios.get(`http://localhost:3001/types`)
        let typesData = types.data
        dispatch({type: GET_TYPES, payload: typesData})

    }
}


export const clearDetail = (dispatch) => {
    dispatch({type: CLEAR_DETAIL, payload: []})
}


export const filterByType = (type) => {
    return({type: FILTER_BY_TYPE, payload: type})
}

export const filterByCreated = (boolean) => {
    return({type: FILTER_BY_CREATED, payload: boolean})
}


export const orderById = (order) => {
    return({type: ORDER_BY_ID, payload: order})
 
}

export const orderByAttack = (order) => {
    return({type: ORDER_BY_ATTACK, payload:order})

}

export const resetPokemons = () =>{
    return({type: RESET_POKEMONS, payload: []})
}
