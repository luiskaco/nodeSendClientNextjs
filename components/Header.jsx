import React from 'react'
import Link from 'next/link';

/**
 *  Nota: Media query en telwing
 *        md:flex-row
 * 
 */

const Header = () => {
    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href="/" >
                <img className="w-64 mb-8 md:mb-0" src="logo.svg" alt="logo"/>
            </Link>
            <div>
                <Link href="/login" >
                        <a className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2">Iniciar Sesión</a>
                </Link>
                <Link href="/crearcuenta" >
                        <a className="bg-black px-5 py-3 rounded text-white font-bold uppercase">Crear Cuenta</a>
                </Link>
            </div>


        </header>
     );
}
 
export default Header;

