import axios from 'axios'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTypes } from '../../redux/actions'


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

    const [errors, setErrors] = useState({
        nombre: "",
        imagen: "",
        vida: "",
        ataque: "",
        defensa: "",
        velocidad: "",
        altura: "",
        peso: "",
        tipo:""
     
    })

    const changeHandler = (event) =>{
        const targetProp = event.target.name
        const valueProp = event.target.value


        validate({...form, [targetProp]: valueProp})
        setForm({...form, [targetProp]: valueProp})
    }

    const validate = (form) => {
        if(/^(?=.{1,15}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/.test(form.nombre) ){
            setErrors({...errors, nombre: ""})
            
        }
        else{
            setErrors({...errors, nombre: "El nombre debe ser una palabra y sólo contener letras de la A la Z"}) 

        }
        if(!form.nombre.length) {
            setErrors({...errors, nombre: "Nombre vacio"})
        }
    }
        const logg = () =>{
            console.log(tipos);
        }
        logg()
    
    // divido al objeto en pares propiedad/valor y lo recorro eliminando las propiedades sin valor

    const formToSend = Object.entries(form).reduce((acc, [key, value]) => {
        if (value !== "") {
            acc[key] = value;
        }
        return acc;
    }, {});

    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(form);
        await axios.post(`http://localhost:3001/pokemons`, formToSend)
        .then(res => alert(res))
        .catch(error => alert(error))

    }


    const buttonDisabled = () => {    
        return (
            <div>
                <button type="submit" disabled={true} >Enviar</button>
                <p>Los campos Nombre, Tipo, Vida, Ataque y Defensa son obligatorios</p>
            </div>
     )
    
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
                <select id="options" value={form.tipo} onChange={changeHandler}name="tipo">
                    <option value="">Selecciona una opción</option>
                   {tipos.map(tipo => {
                    return (<option value={tipo.nombre}>{tipo.nombre}</option>)
                   })} 
                 
                </select>                
                {/* <input type="text" value={form.tipo} onChange={changeHandler}name="tipo"/> */}
                {errors.tipo && <span>{errors.tipo}</span> } 
            </div>

            <div>
                <label>imagen</label>
                <input type="text" value={form.imagen} onChange={changeHandler}name="imagen"/>
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
            </div>
            <div>
                <label>altura</label>
                <input type="number" value={form.altura} onChange={changeHandler}name="altura"/>
            </div>
            <div>
                <label>peso</label>
                <input type="number" value={form.peso} onChange={changeHandler}name="peso"/>
            </div>
            
            {form.nombre && form.tipo && form.vida && form.ataque && form.defensa
            ? <button type="submit" disabled={false}>Enviar</button> 
            : buttonDisabled()}
           
        </form>
    )
}

export default Form