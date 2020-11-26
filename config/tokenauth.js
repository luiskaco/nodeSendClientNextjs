// Nota importamos hacia el archivo de axios
import clienteAxios from './axios';

const tokenAuth = token => {
         // Si es un usuario autenticado
    if(token){
        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        // Si no lo es. 
        delete clienteAxios.defaults.headers.common['Authorization'];

        /**
         * NOta: Limpiamos cabecera para asegurarnos de que no quede token en la cabecera.
         * 
         */

    }
}

export default tokenAuth;
