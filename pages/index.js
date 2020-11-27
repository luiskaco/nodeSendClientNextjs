import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import Dropzone from '../components/dropzone';
import authContext from '../context/auth/authContext';
import Link from 'next/link';

const Index = () => {

   // Extraer el usuario autenticado del Storage | Verificar si un usuario ha iniciado session o no.
   const AuthContext = useContext(authContext);
   const {usuarioAutenticado} = AuthContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])

  return ( 
      <Layout>
          <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                    <Dropzone />
                    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                      <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir archivos de forma sencilla y privada</h2> 
                      <p className="text-lg leading-loose">
                        <span className="text-red-500 font-bold">ReactNodeSend</span> te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado después de ser descargado. Así que puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en línea para siempre.
                      </p>
                      <Link href="/crearcuenta">
                          <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una  cuenta para mayores beneficios</a>
                      </Link>
                  </div>
                </div>
          </div>
      </Layout>
   );
}
 
export default Index;