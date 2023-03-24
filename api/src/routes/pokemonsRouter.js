const { Router } = require('express');
const { postValidate } = require('../middleWares/postValidate')
const {
    getPokemonsHandler, 
    getPokemonHandlerId, 
    createPokemonHandler} = require('../handlers/pokemonsHandlers')

const pokemonsRouter = Router()

pokemonsRouter.get("/", getPokemonsHandler)

pokemonsRouter.get("/:idPokemon", getPokemonHandlerId)

pokemonsRouter.post("/",postValidate, createPokemonHandler)



module.exports = pokemonsRouter;