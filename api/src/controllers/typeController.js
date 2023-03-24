const { Type } = require('../db')
const axios = require('axios')

const getTypes = async () => {
    let typesArray = []
    await axios.get(`https://pokeapi.co/api/v2/type`)
    .then(res => res.data.results)
    .then(res => res.map(type => typesArray.push(type.name)))
    return typesArray
}

const saveTypes = async () => {
        let apiTypes = await getTypes()
        apiTypes.map(type => {
            Type.create({nombre: type})
        })
        return await Type.findAll()
}

module.exports = { getTypes, saveTypes };