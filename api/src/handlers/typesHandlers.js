const { getTypes, saveTypes } = require('../controllers/typeController')
const { Type } = require('../db')

const getTypesHandler = async(req, res) => {
   try{
    const prueba = await Type.findAll()
    if(prueba.length) return res.status(200).json(await Type.findAll())
    else {
      await saveTypes()
      res.status(200).json(await Type.findAll()) 
    }
   }catch(error) {
    res.status(400).json({error: error.message})
   }
    
}

module.exports =  getTypesHandler;