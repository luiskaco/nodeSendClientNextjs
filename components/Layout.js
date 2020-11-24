import React from 'react';
import Head from 'next/head';  // Para agregar etiquetas en el html
import Header from './Header';


/** 
 * Nota: children se usa para recibir los otros componentes. 
 * 
 * NOta: Todas las etiqueta deben llevar /
 * 
 */
const Layout = ({children}) => {
    return ( 
        <>  
            <Head>
                <title>React Node Send</title>
                <link href="https://unpkg.com/tailwindcss@1.0.6/dist/tailwind.css" rel="stylesheet" />
            </Head>

            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto">
                    <Header />
                    <div className="mt-20">
                         {children}
                    </div>    
                </div>   
            </div>
        </>
    );
}
 
export default Layout;

