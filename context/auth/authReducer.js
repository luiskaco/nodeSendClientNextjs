// Importar type | documentacion de los procesos
import { 
    REGiSTRO_EXITOSO ,
    REGiSTRO_ERROR,
    LIMPIAR_ALERTA

     } from '../../type';


export default (state, action) => {

    switch(action.type){
        
        case REGiSTRO_EXITOSO:
        case REGiSTRO_ERROR:
            return {
                ...state,
                mensaje: action.payload,
            }
        case LIMPIAR_ALERTA: 
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