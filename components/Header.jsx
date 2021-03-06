import React, {useContext, useEffect} from 'react'
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from  '../context/app/appContext';
import {useRouter} from 'next/router';

/**
 *  Nota: Media query en telwing
 *        md:flex-row
 * 
 */

 /**
  * NOta: Usamos next/link cuando hacemos uso del componente Link y se quiere usar un redireccion nativa.
  *
  */

const Header = () => {
    // ROuter 
    const router = useRouter();

    // Extraer el usuario autenticado del Storage | Verificar si un usuario ha iniciado session o no.
   const AuthContext = useContext(authContext);
   const {usuarioAutenticado, usuario, cerrarSesion} = AuthContext;

    // Context de la Aplicación
   const AppContext = useContext(appContext);
   const { limpiarState } = AppContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])

    // Enviando a la pantallaPrincipal
    const redireccionar = () => {
        router.push('/');
        limpiarState();
    }

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
           
                <img 
                onClick={() => redireccionar()}
                className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" alt="logo"/>
            
          
           
            <div>
                {
                    usuario ? (
                            <div className="flex items-center">
                                <p className="mr-2">Hola!, {usuario.nombre}</p>
                                <button
                                    type="button"
                                    className="bg-black px-5 py-3 rounded text-white font-bold uppercase"
                                    onClick={() => cerrarSesion()}
                                >Cerrar Sesión</button>
                            </div>
                     ) : (
                        <>
                            <Link href="/login" >
                                    <a className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2">Iniciar Sesión</a>
                            </Link>
                            
                            <Link href="/crearcuenta" >
                                    <a className="bg-black px-5 py-3 rounded text-white font-bold uppercase">Crear Cuenta</a>
                            </Link>
                        </>
                     )
                }
                
            </div>
        </header>
     );
}
 
export default Header;

