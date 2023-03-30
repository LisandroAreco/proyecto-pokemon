 const {
    createPokemon, 
    getDbApiPokemons,
    getPokemonById,
    getAllPokemonByName} = require('../controllers/pokemonController')

const getPokemonsHandler = async (req,res) => {
  const { nombre } = req.query

    if(nombre) {
        try{
            const allPokemonsByName = await getAllPokemonByName(nombre)
            
            res.status(200).json(allPokemonsByName)
        }catch (error) {
            res.status(400).json(error.message)

        }
    }
    else{ 
        try{
            const pokemons = getDbApiPokemons()
            res.status(200).json( await pokemons)

        }catch(error) {
            res.status(400).send("Hubo un error al traer los pokemones de la Api y base de datos")
    }
}
}

const getPokemonHandlerId = async (req,res) => {
    const {idPokemon} = req.params 
    try{
        const pokemonById = await getPokemonById(idPokemon)
        res.status(200).json(pokemonById)
    }catch(error) {
        res.status(400).json(`El id: ${idPokemon} no corresponde a ningún pokemón`)
    }
    
}


const createPokemonHandler =async (req,res) => {
    const {nombre, vida, imagen,  ataque, defensa, velocidad, altura, peso, tipo} = req.body

    try{
        const newPokemon = await createPokemon(nombre, vida,imagen, ataque, defensa, velocidad, altura, peso, tipo)
        
        res.status(200).json(newPokemon)
    }catch (error) {
        res.status(400).json({error: error.message})

    }   
}


module.exports = {
    getPokemonsHandler,
    getPokemonHandlerId,
    createPokemonHandler
}