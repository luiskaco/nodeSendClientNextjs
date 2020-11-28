import React, {useReducer} from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import clienteAxios from '../../config/axios';

import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR
} from '../../type';

const AppState = ({children}) => {

    // Iniciar el State
    const initialState = {
        mensaje_archivo: null,
        nombre:'',
        nombre_original:'',
        cargando: null, 
        descargas:1,
        password:'',
        autor:null,
        url: ''
    }

    // Crear dispatch y State
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Subir Archivo al Servidor
    const subitArchivo = async (formData, nombreArchivo) => {

        dispatch({
            type:SUBIR_ARCHIVO,
        });

        try {
            const resultado = await clienteAxios.post('/api/archivos', formData);
            console.log(resultado.data);

            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo, 
                    nombre_original: nombreArchivo
                }
            })
         
        } catch (error) {
            console.log(error);
            dispatch({
                type:SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
  
    }
    
    // Creando enlance una vez que se subio el archivo
    const crearEnlace = async() =>{
       const data = {
           nombre: state.nombre,
           nombre_original: state.nombre_original,
           descargas:state.descargas,
           password:state.password,
           autor:state.autor
       }
       try {
           const resultado = await clienteAxios.post('/api/enlaces', data );
          // console.log(resultado.data.msg);

            dispatch({
                type:CREAR_ENLACE_EXITO,
                payload:resultado.data.msg
            });

       } catch (error) {
           console.log(error);
       }
    }


    // Mostrar una alerta
    const mostrarAlerta = msg => {
       
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        })

        limpiarMensaje();
    }

      // LIMPLIEZA de MENSAJES
    const limpiarMensaje = () =>{
        // Limpiar alertas
        setTimeout(() => {
                
            dispatch({
                type: OCULTAR_ALERTA
            });

        }, 3000);
    }

    return ( 
        <appContext.Provider
            value={{
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                mensaje_archivo: state.mensaje_archivo,
                cargando: state.cargando,
                descargas:state.descargas,
                password:state.password,
                autor:state.autor,
                url: state.url,
                mostrarAlerta,
                subitArchivo,
                crearEnlace
            }}
        >
            {children}
        </appContext.Provider>
     );
}
 
export default AppState;