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


export default (state, action) => {

    switch(action.type){
        
        case REGiSTRO_EXITOSO:
        case REGiSTRO_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                mensaje: action.payload,
            }
        case LOGIN_EXITOSO:
            // Guardar token
            localStorage.setItem('react_token', action.payload);
            /** 
             * Nota: Almacenamos el token en local Storage
             * 
             * **/
            return {
                ...state,
                token: action.payload,
                autenticado: true
            }
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                //autenticado: true,
                usuario: action.payload
            }
        case CERRAR_SESSION:
            localStorage.removeItem('react_token');
            return {
                ...state,
                autenticado: null,
                usuario: null,
                token:null
            }

        case OCULTAR_ALERTA: 
            return {
                ...state,
                mensaje: null,
            }
        default:
            return state;
    }

}

/**
 *  Nota: los type se se usan el swith par amodificar el state
 * 
 * 
 */