import React, { useReducer } from 'react';
// importamos authContext
import authContext from './authContext';
// importamos authreducer
import authReducer from './authReducer';

// Importar type | documentacion de los procesos
import { 
        REGiSTRO_EXITOSO ,
        REGiSTRO_ERROR,
        OCULTAR_ALERTA,
        LOGIN_ERROR,
        LOGIN_EXITOSO,
        USUARIO_AUTENTICADO,
        CERRAR_SESSION
    } from '../../type';

// importar Cliente Axios
import clienteAxios from '../../config/axios';
// importamos token Auth
import tokenAuth from '../../config/tokenauth';

const AuthState = ({children}) => {


    /**
     * Nota: el initalState se ejecuta tanto en el cliente como en el servidor. Por ser una aplicacion hibrida
     * Se debe realizar comprobaciones para poder ejecutar ciertas acciones con algunos elementos del javaScripts.
     * 
     * En el servidor de express de nextjs no existe localStorage. Por eso se usa una comprobacion para poder 
     * usarse localStorage en el cliente.
     */

    // Definir el state inicial
    const inicialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('react_token') : '', 
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
                se usa response | error.response
            */

        }

         // Limpiar
         limpiarMensaje();

    }
    // Autenticar Usuario

    const iniciarSession = async datos => {
        //console.log(datos);

        try {
            const respuesta = await clienteAxios.post('/api/auth',datos);
            //console.log(respuesta.data.token);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            });

        } catch (error) {
            // console.log(error.response.data.msg);    
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
            /*
                nota: Para obtener los mensaje regresado por el codigo 400
                se usa response | error.response
            */
        }
        // Limpiar
        limpiarMensaje();
    }

    // Retorna el usuario autenticado en base al JWT
    const usuarioAutenticado = async () => {
        // console.log('Revisando...');
        // Obteniendo el token localStorage
        const token = localStorage.getItem('react_token');

        if(token){
            tokenAuth(token);

            try {
                const respuesta = await clienteAxios.get('/api/auth');
                //console.log(respuesta);

                if(respuesta.data.usuario){
                    dispatch({
                        type: USUARIO_AUTENTICADO,
                        payload: respuesta.data.usuario
                    })
                }
    
            } catch (error) {
                console.log(error);
                dispatch({
                    type: LOGIN_ERROR,
                    payload: error.response.data.msg
                });
            }
        }

       
        
    }

    // Cerrando Session 
    const cerrarSesion =() => {
       // console.log("cerrando session...");
        dispatch({
            type:CERRAR_SESSION
        });
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
                iniciarSession,
                usuarioAutenticado,
                cerrarSesion
               
            }}
        >

            {children}

        </authContext.Provider>
    );
}
 
export default AuthState;