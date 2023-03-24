import axios from "axios"

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMON = "GET_POKEMON"
export const GET_TYPES = "GET_TYPES" 

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

export const getTypes = () => {
    return async function (dispatch) {
        const types = await axios.get(`http://localhost:3001/types`)
        let typesData = types.data
        dispatch({type: GET_TYPES, payload: typesData})

    }
}