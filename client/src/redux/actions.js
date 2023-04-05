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
export const RESET_FILTERS = "RESET_FILTERS"
export const ERRORS = "ERRORS"

export const getPokemons =  () => {
    return async function (dispatch) {
        try{
            const pokemons = await axios.get(`pokemons`)
            let allPokemons = pokemons.data
            dispatch({type:GET_POKEMONS, payload:allPokemons})
        }catch(error){
            dispatch({type: ERRORS, payload: error.response.data})
        }
    };
}

export const getPokemon =  (id) => {
    return async function (dispatch) {
        try{
            const pokemons = await axios.get(`pokemons/${id}`)
            let pokemon = pokemons.data
            dispatch({type:GET_POKEMON, payload:pokemon})
        }catch(error){
            dispatch({type: ERRORS, payload: error.response.data})
        }
    };

}
export const getPokemonByName =  (nombre) => {
    return async function (dispatch) {
        try{
            const pokemons = await axios.get(`pokemons?nombre=${nombre}`)
            let pokemon = pokemons.data
            dispatch({type:GET_POKEMON_BY_NAME, payload:pokemon})
        }
        catch(error){
            dispatch({type: ERRORS, payload: error.response.data})
        }
    };
}

export const getTypes = () => {
    return async function (dispatch) {
        const types = await axios.get(`types`)
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
    console.log(boolean);
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
export const resetError = () =>{
    return({type: ERRORS, payload: ""})
}
export const resetFilters = () => {
    return({type: RESET_FILTERS})
}
