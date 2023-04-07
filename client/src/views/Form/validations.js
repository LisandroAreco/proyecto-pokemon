const validate = (form) => {
    let errors = {}

    if(!/^([A-Za-z]{1,20}\s)?[A-Za-z]{1,20}$/.test(form.nombre) ){
        errors.nombre = "El nombre solo puede contener letras, maximo 2 palabras y no puede terminar en espacio vacío"
    }
    if(form.nombre === "") errors.nombre = "Debe contener al menos 1 letra"
    if(form.tipo.length > 3) errors.tipo = "Debe ser de 1 a 3 tipos inclusive"
    // if(form.imagen !== "" && (form.imagen > 800 || form.imagen <=0)) errors.imagen ="El número de imagen debe estar entre el 1 y el 800 inclusive"
    if(form.vida !== "" && (form.vida > 150 || form.vida <=0)) errors.vida ="La vida debe estar entre el 1 y el 150 inclusive"
    if(form.ataque !== "" && (form.ataque > 150 || form.ataque <=0)) errors.ataque ="El poder de ataque debe estar entre el 1 y el 150 inclusive"
    if(form.defensa !== "" && (form.defensa > 150 || form.defensa <=0)) errors.defensa ="La defensa debe estar entre el 1 y el 150 inclusive"
    if(form.velocidad !== "" && (form.velocidad > 150 || form.velocidad <=0)) errors.velocidad ="La velocidad debe estar entre el 1 y el 150 inclusive"
    if(form.altura !== "" && (form.altura > 15 || form.altura <=0)) errors.altura ="La altura debe estar entre el 1 y el 15 inclusive"
    if(form.peso !== "" && (form.peso > 1000 || form.peso <=0 ))errors.peso ="El peso debe estar entre el 1 y el 1000 inclusive"

    return errors
}

export default validate