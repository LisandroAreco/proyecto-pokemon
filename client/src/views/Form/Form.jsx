import axios from 'axios'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTypes, resetPokemons } from '../../redux/actions'
import validate from "./validations"
import style from "./Form.module.css"


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
        try {
            const response = await axios.post(`http://localhost:3001/pokemons`, formToSend);
            console.log(response.data);
            alert("Se ha creado correctamente el pokemon " + response.data.nombre) // aquí puedes acceder a la respuesta del backend
            dispatch(resetPokemons());
          } catch (error) {
            console.error(error); // manejo de errores
            alert(error.message);
          }
    }


    const buttonDisabled = () => {    
        return (
            <div>
                <button type="submit" className={style.button_disabled} disabled={true} >Crear</button>
                <p className={style.button_disabled_text}>*Los campos Nombre, Tipo, Vida, Ataque y Defensa son obligatorios</p>
            </div>
     )

    }

    const closeType = (tipo) => {
         setForm({...form, tipo: form.tipo.filter(type => type !== tipo)})
     }
     return(
        <div className={style.container}>
            <form className={style.form_pokemon} onSubmit= {submitHandler}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={form.nombre} onChange={changeHandler} name="nombre" />
                    {errors.nombre && <span>{errors.nombre}</span> } 
                </div>
                <div className={style.tipo}>
                    <label>Tipo:</label>
                    <select id="options" value={form.tipo} onChange={changeHandlerTipo}name="tipo" >
                        <option value="">Elige el tipo</option>

                    {tipos.map(tipo => {
                        return (<option key={tipo.nombre} value={tipo.nombre}>{tipo.nombre}</option>)
                    })} 
                    </select>               

                    {errors.tipo && <span>{errors.tipo}</span> } 
                </div>

                <div>
                    <label>Imagen:</label>
                    <input type="number" value={form.imagen} onChange={changeHandler}name="imagen" placeholder='Entre el 0 y 800'/>
                    {errors.imagen && <span>{errors.imagen}</span> } 

                </div>

                <div>
                    <label>Vida:</label>
                    <input type="number" value={form.vida} onChange={changeHandler}name="vida"/>
                    {errors.vida && <span>{errors.vida}</span> } 

                </div>
                <div>
                    <label>Ataque:</label>
                    <input type="number" value={form.ataque} onChange={changeHandler}name="ataque"/>
                    {errors.ataque && <span>{errors.ataque}</span> } 

                </div>
                <div>
                    <label>Defensa:</label>
                    <input type="number" value={form.defensa} onChange={changeHandler}name="defensa"/>
                    {errors.defensa && <span>{errors.defensa}</span> } 

                </div>
                <div>
                    <label>Velocidad:</label>
                    <input type="number" value={form.velocidad} onChange={changeHandler}name="velocidad" />
                    {errors.velocidad && <span>{errors.velocidad}</span> } 

                </div>
                <div>
                    <label>Altura:</label>
                    <input type="number" value={form.altura} onChange={changeHandler}name="altura"/>
                    {errors.altura && <span>{errors.altura}</span> } 

                </div>
                <div>
                    <label>Peso:</label>
                    <input type="number" value={form.peso} onChange={changeHandler}name="peso"/>
                    {errors.peso && <span>{errors.peso}</span> } 

                </div>

                {form.nombre && form.tipo.length >= 1 && form.vida && form.ataque && form.defensa && (Object.keys(errors).length === 0)
                ? <button type="submit" className={style.button_enabled} disabled={false}>Crear</button> 
                : buttonDisabled()}

                <div className={style.container_selected_types}>
                    <p>Tipos seleccionados:</p>
                    {form.tipo.length >= 1 && form.tipo.map(tipo => {
                        return(
                            <div className={style.selected_types} key={tipo}>
                                <button onClick={() => closeType(tipo)}>x</button>
                                <h3>{tipo}</h3>
                            </div>
                        )
                    })}  
                </div>
            </form>
        </div>
    )
}

export default Form