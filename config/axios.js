import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: process.env.backendURL
});

/**
 * Nota: Definimos el clientes con la url base para ser modifcada por variables de entorno segun sea subido. 
 */

export default clienteAxios;