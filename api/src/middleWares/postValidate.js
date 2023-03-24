const postValidate = (req,res,next) => {
    const {nombre, vida, ataque, defensa} = req.body

    if(!nombre || !vida || !ataque || !defensa){
        return res.status(400).json({error: "Los siguientes datos son obligatorios: nombre, vida, ataque, defensa"})
    }
    next()
}

module.exports = { postValidate }