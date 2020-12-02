import Layout from  '../../components/Layout';
import clienteAxios from '../../config/axios';

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
    console.log(enlaceProps);
    return (
        <Layout>
            <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
            <div className="flex items-center justify-center mt-10">
            <a 
                href={`${process.env.backendURL}/api/archivos/${enlaceProps.archivo}`} 
                className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                download    
            >Aquí</a>
            </div>
        </Layout>

    )

}