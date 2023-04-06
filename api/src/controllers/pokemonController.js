const { Pokemon, Type } = require('../db')
const axios = require('axios')


const createPokemon = async (nombre, vida, imagen, ataque, defensa, velocidad, altura, peso, tipo) =>{ 
    try{
        let imagenRandom = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${imagen}.svg`
        let newPokemon = await Pokemon.create({nombre: nombre.toLowerCase(), imagen: imagenRandom, vida, ataque, defensa, velocidad, altura, peso})
        let similitudes = await Type.findAll({ where: { nombre: tipo}})
        //Relacion de tipos en trabla intermedia
        newPokemon.addType(similitudes)
        return newPokemon
    }catch{
        throw new Error(`No se ha podido crear a ${nombre}`)
    }
}


const getAllApiPokemons = async () => {
        let i = 1
        let pokemons = [] 
        while(i < 90){
            let dataApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            pokemons.push(dataApi)
            i++
        }
           
        pokemons = (await Promise.all(pokemons)).map(poke => {
            return({
                id: poke.data.id,
                nombre: poke.data.name,
                imagen: poke.data.sprites.other.dream_world.front_default,
                vida: poke.data.stats[0].base_stat,
                ataque: poke.data.stats[1].base_stat,
                defensa: poke.data.stats[2].base_stat,
                velocidad: poke.data.stats[5].base_stat,
                altura: poke.data.height,
                peso: poke.data.weight,
                tipo: poke.data.types.map(ty => ty.type.name),
                created: "false"
            })
        })
        return pokemons
        
    }

const getAllDbPokemons = async () => {
    let pokes =  await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['nombre'],
            through: { attributes: []}
        }
    })
    pokes = pokes.map((poke) => {
        return {
          id: poke.id,
          nombre: poke.nombre,
          vida: poke.vida,
          ataque: poke.ataque,
          defensa: poke.defensa,
          velocidad: poke.velocidad,
          altura: poke.altura,
          peso: poke.peso,
          tipo: poke.types.map((t) => t.nombre),
          imagen: poke.imagen,
          created: poke.created
        }
      })
      return pokes
}

const getDbApiPokemons = async () => {
    const apiPoke = await getAllApiPokemons()
    const dbPoke = await getAllDbPokemons()
    const allPokes = apiPoke.concat(dbPoke)
    return allPokes
}

const getPokemonById = async (id) => {
    if(isNaN(id)) {
        try{
            const poke = await Pokemon.findByPk(id,  {
                include: {
                  model: Type, 
                  attributes: ['nombre'],
                  through: { attributes: []} 
                }
              })
            return poke 
        }catch(error){
            throw new Error(`No existe el pokemon con ID: ${id}`)
        }
  
    }else {
        try{
            const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            return {
                id: poke.data.id,
                nombre: poke.data.name,
                imagen: poke.data.sprites.other.dream_world.front_default,
                vida: poke.data.stats[0].base_stat,
                ataque: poke.data.stats[1].base_stat,
                defensa: poke.data.stats[2].base_stat,
                velocidad: poke.data.stats[5].base_stat,
                altura: poke.data.height,
                peso: poke.data.weight,
                tipo: poke.data.types.map(ty => ty.type.name),
                created: false
            }
        }
        catch(error){
            throw new Error (`No existe el pokemon con ID: ${id}`)
        }
    }
}

const getApiPokemonByName = async (nombre) => {
    nombre = nombre.toLowerCase()
    const apiPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(poke => {
        return {
            id: poke.data.id,
            nombre: poke.data.name,
            imagen: poke.data.sprites.other.dream_world.front_default,
            vida: poke.data.stats[0].base_stat,
            ataque: poke.data.stats[1].base_stat,
            defensa: poke.data.stats[2].base_stat,
            velocidad: poke.data.stats[5].base_stat,
            altura: poke.data.height,
            peso: poke.data.weight,
            tipo: poke.data.types.map(ty => ty.type.name)
        }
    }).catch(error => {
        return []
    }) 
    return apiPokemons
}

const getDbPokemonByName = async (nombre) => {
    nombre = nombre.toLowerCase()
    try{
        const dbPokemonByName = await Pokemon.findAll({ where: {nombre: nombre} , 
            include: {
              model: Type, 
              attributes: ['nombre'],
              through: { attributes: []} 
            }
          })
        return dbPokemonByName
    }catch (error) {
        return []
    }
}

const getAllPokemonByName = async (nombre) => {
     let allDbPokemons = (await getDbPokemonByName(nombre))
     let allApiPokemons = (await getApiPokemonByName(nombre))
     let allPokemons = allDbPokemons.concat(allApiPokemons)

     if (allPokemons.length){

      return allPokemons   
    }else {
        throw new Error([`No se encontraron pokemons con el nombre ${nombre}`]) 
        
    }
}





module.exports = {createPokemon, getAllDbPokemons, getDbApiPokemons, getPokemonById, getApiPokemonByName, getDbPokemonByName, getAllPokemonByName};