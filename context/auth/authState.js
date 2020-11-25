import React, { useReducer } from 'react';
// importamos authContext
import authContext from './authContext';
// importamos authreducer
import authReducer from './authReducer';

// Importar type | documentacion de los procesos
import { 
        REGiSTRO_EXITOSO ,
        REGiSTRO_ERROR,
        LIMPIAR_ALERTA,
        USUARIO_AUTENTICADO } from '../../type';

// importar Cliente Axios
import clienteAxios from '../../config/axios';

const AuthState = ({children}) => {

    // Definir el state inicial
    const inicialState = {
        token:'', 
        autenticado:null, 
        usuario:null, 
        mensaje:null, 
        classMensaje:{
            mensajeAlerta:null, 
            estiloAlerta:null
        }
    }

    // Definir el reducer
    const [state, dispatch] = useReducer(authReducer, inicialState); 

    // Registrar Usuario
    const registrarUsuario = async datos => {
        //console.log(datos);
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            //console.log(respuesta.data.msg);
           
            dispatch({
                type: REGiSTRO_EXITOSO,
                payload: respuesta.data.msg
            })      

        } catch (error) {
            //console.log(error.response.data.msg);

            dispatch({
                type: REGiSTRO_ERROR,
                payload: error.response.data.msg
            })

            /*
                nota: Para obtener los mensaje regresado por el codigo 400
                se usa response
            */

        }

        // Limpiar alertas
              setTimeout(() => {
               
                dispatch({
                    type: LIMPIAR_ALERTA
                });

            }, 3000);
    }


    // Usuario autenticado
    const usuarioAutenticado = nombre => {
        dispatch({
            type:USUARIO_AUTENTICADO,
            payload: nombre
        })
        /**
         *  Nota: Siempre el dispacth lleva dos tipo los type y payload
         * 
         *  type: se encarga de evaluar lo que se quiere.
         *  payload: Es el encargado de modificar el state.
         * 
         * / */
    }


    /* Para que se agreguen todos los hijos*/ 
    return(
        <authContext.Provider
            value={{
                // Variables
                token:state.token, 
                autenticado:state.autenticado,
                usuario:state.usuario,
                mensaje:state.mensaje,
                // Funciones
                registrarUsuario,
                usuarioAutenticado
               
            }}
        >

            {children}

        </authContext.Provider>
    );
}
 
export default AuthState;