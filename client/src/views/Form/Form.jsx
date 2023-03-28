import axios from 'axios'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTypes, resetPokemons } from '../../redux/actions'
import validate from "./validations"


const Form = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getTypes())
    },[dispatch])
    const tipos = useSelector(state=> state.types)

    const [form, setForm] = useState({
        nombre: "",
        imagen: "",
        vida: "",
        ataque: "",
        defensa: "",
        velocidad: "", //(si tiene).
        altura: "", //(si tiene).
        peso: "",
        tipo:"" //(si tiene).
        // posibilidad de seleccionar/agregar varios tipos en simultáneo.
        // botón para crear el nuevo pokemon.
    })

    const [errors, setErrors] = useState( {} )

    const changeHandler = (event) =>{
        const targetProp = event.target.name
        const valueProp = event.target.value

        // validate({...form, [targetProp]: valueProp})
        setErrors(validate({...form, [targetProp]: valueProp}))
        setForm({...form, [targetProp]: valueProp})
    }
    const changeHandlerTipo = (event) =>{
        const valueProp = event.target.value
        if(form.tipo.includes(valueProp)) return   
        else {validate({...form, tipo: [...form.tipo, valueProp]})
            setForm({...form, tipo: [...form.tipo, valueProp]})}
    }
    
    // divido al objeto en pares propiedad/valor y lo recorro eliminando las propiedades sin valor

    const formToSend = Object.entries(form).reduce((acc, [key, value]) => {
        if (value !== "") {
            acc[key] = value;
        }
        return acc;
    }, {});

    const submitHandler = async (event) => {
        event.preventDefault()
        await axios.post(`http://localhost:3001/pokemons`, formToSend)
        .then(res => alert(res))
        .catch(error => alert(error))
        dispatch(resetPokemons())
    }


    const buttonDisabled = () => {    
        return (
            <div>
                <button type="submit" disabled={true} >Enviar</button>
                <p>*Los campos Nombre, Tipo, Vida, Ataque y Defensa son obligatorios</p>
            </div>
     )

    }

    const closeType = (tipo) => {
         setForm({...form, tipo: form.tipo.filter(type => type !== tipo)})
     }
     return(
        <form onSubmit= {submitHandler}>
            <div>
                <label>nombre</label>
                <input type="text" value={form.nombre} onChange={changeHandler}name="nombre"/>
                {errors.nombre && <span>{errors.nombre}</span> } 
            </div>
            <div>
                <label>tipo</label>
                <select id="options" value={form.tipo} onChange={changeHandlerTipo}name="tipo">
                    <option value="">Selecciona una tipo</option>
                   {tipos.map(tipo => {
                    return (<option key={tipo.nombre} value={tipo.nombre}>{tipo.nombre}</option>)
                   })} 
                 
                </select>                
                {/* <input type="text" value={form.tipo} onChange={changeHandler}name="tipo"/> */}
                {errors.tipo && <span>{errors.tipo}</span> } 
            </div>

            <div>
                <label>imagen</label>
                <input type="number" value={form.imagen} onChange={changeHandler}name="imagen"/>
                {errors.imagen && <span>{errors.imagen}</span> } 

            </div>

            <div>
                <label>vida</label>
                <input type="number" value={form.vida} onChange={changeHandler}name="vida"/>
                {errors.vida && <span>{errors.vida}</span> } 

            </div>
            <div>
                <label>ataque</label>
                <input type="number" value={form.ataque} onChange={changeHandler}name="ataque"/>
                {errors.ataque && <span>{errors.ataque}</span> } 

            </div>
            <div>
                <label>defensa</label>
                <input type="number" value={form.defensa} onChange={changeHandler}name="defensa"/>
                {errors.defensa && <span>{errors.defensa}</span> } 

            </div>
            <div>
                <label>velocidad</label>
                <input type="number" value={form.velocidad} onChange={changeHandler}name="velocidad"/>
                {errors.velocidad && <span>{errors.velocidad}</span> } 

            </div>
            <div>
                <label>altura</label>
                <input type="number" value={form.altura} onChange={changeHandler}name="altura"/>
                {errors.altura && <span>{errors.altura}</span> } 

            </div>
            <div>
                <label>peso</label>
                <input type="number" value={form.peso} onChange={changeHandler}name="peso"/>
                {errors.peso && <span>{errors.peso}</span> } 

            </div>

            {form.nombre && form.tipo.length >= 1 && form.vida && form.ataque && form.defensa && (Object.keys(errors).length === 0)
            ? <button type="submit" disabled={false}>Enviar</button> 
            : buttonDisabled()}

            {form.tipo.length >= 1 && form.tipo.map(tipo => {
                return(
                    <div key={tipo}>
                        <button onClick={() => closeType(tipo)}>X</button>
                        <h3>{tipo}</h3>
                    </div>
                )
            })}
            
          
           
        </form>
    )
}

export default Form