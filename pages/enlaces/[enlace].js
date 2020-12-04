import React, {useState, useContext} from 'react';
import Layout from  '../../components/Layout';
import clienteAxios from '../../config/axios';

// Alerta
import Alerta from '../../components/alertas';
// Importando app context
import appContext from '../../context/app/appContext';


/*
   Nota: getStaticProps servira para traer la informacion correspondiente a los enlaces. 
*/
export async function getServerSideProps({params}) {
    const {enlace} = params;
    const resultado = await clienteAxios.get(`api/enlaces/${enlace}`);

    console.log(enlace);

    return {
        props:{
            enlaceProps: resultado.data
        }
    }
}
/**
 * Nota: getStaticPath se encarga de controltar las rutas.
 *       El permitira llegar a getServerSideProps
 */

export async function getServerSidePaths(props) {
    // Genera automatica los enlaces de las url
    const enlaces = await clienteAxios.get('/api/enlaces');
   
    
    return {
        paths: enlaces.data.enlaces.map( enlace => ( {
            params: { enlace : enlace.url }
               // enlace la variable que hemos definod en el archivo [enlace].js y enlace.url el valor.
        })),
        fallback: false  // Estando en false devuelve una pagina 404  | si esta como true carga la web sin informaicon. 
    }
  
    /**
     * Paths y fallback son funciones necesarias
     * Nota: Mejor forma para crear un arreglo es con map.
     */
}

export default ({enlaceProps}) => {
     // Extraer context app
     const AppContext = useContext(appContext);
     const {mostrarAlerta, mensaje_archivo} = AppContext;


   // console.log(enlaceProps);

   // Verificar si tiene password
   const [tienePassword, setTienePassword] = useState(enlaceProps.password);

   // Leer lo seteado en el input
   const [password, setpassword] = useState('');

  // console.log(tienePassword);

   const verificarPassword = async e =>{
        e.preventDefault();

            // ARmando los valores que se enviaran al server
            const data = {
                password
            }

        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlaceProps.enlace}`,data);
            //console.log(resultado);
            setTienePassword(resultado.data.password);
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }
        
   }

    return (
        <Layout>
            {
                tienePassword ? (
                    <> 
                    <p className="text-center">Este enlace esta protegido por un password, colocalo a continuación</p>

                    {
                        // Imprimir mensaje de alertas
                        mensaje_archivo && <Alerta />
                    }


                       <div className="flex justify-center mt-5">
                            <div className="w-full max-w-lg">
                                <form
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={ e => verificarPassword(e) }
                                >
                                    <div className="mb-4">
                                        <label 
                                            className="block text-black text-sm font-bold mb-2"
                                            htmlFor="password"
                                        >Password</label>
                                        <input
                                            type="password"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            placeholder="Password del enlace"
                                            value={password}
                                            onChange={e => setpassword(e.target.value)}
                                            
                                        />
                                    </div>

                                    <input 
                                        type="submit"
                                        className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                        value="Validar Password..."
                                    />
                                </form>
                            </div>
                        </div>

                    </>
                ) : (
                    <>
                    <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
                        <div className="flex items-center justify-center mt-10">
                        <a 
                            href={`${process.env.backendURL}/api/archivos/${enlaceProps.archivo}`} 
                            className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                            download    
                        >Aquí</a>
                        </div>
                    </>
                )

            }
           
        </Layout>

    )

}