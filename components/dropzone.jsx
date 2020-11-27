import React, { useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import clienteAxios from '../config/axios';

/**
 *   useMemo
 *   useCallnack  : Se usa cuando se realiza muchas intereaciones en la web.
 * 
 */

 const Dropzone = () => {

    const onDropRejected = () => {
        console.log("no se puede subir");
    }

    // Declaramos el valor inicial de useDropzone
    const onDropAccepted = useCallback( async (acceptedFiles) => {
        console.log(acceptedFiles);

        // Crear un form-data
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0]);

        //const resultado = await clienteAxios.post('/api/archivos', formData);
        //console.log(resultado);

    }, []);

    /**
     * nota: video 534 useCallback
     */

     /**
      * onDrop : Acepta todos sin limitaciones
      * onDropAccepted :  solo aceptas las que cumplan con las condiciones
      * onDropRejected:  las regleas que determinar el accepte
      */
  
    // Extraer contenido del dropzone
    const {getRootProps, getInputProps, isDragActive , acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000});
    
    /**
     *   nota: acceptedFiles crea los archivos que se subira. Es decir genera la data del archivo.
     *         Es un arreglo de datos. 
     *   acceder { console.log(archivos); }
     * 
     * 
     */

     // Mosrando informacion del archivo
    const archivos = acceptedFiles.map(archivo =>(
        <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-xl">{archivo.path}</p> 
            <p className="text-sm text-gray-500">{ (archivo.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
        </li>
    ) );

    // Creando enlance
    const crearEnlace = () =>{
        console.log("creando el enlace");
    }




     return ( 
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4
           ">
      
              {   
                    /*
                    *  nota: ...getRootProp , ...getInputProp Se utiliza para que funcione el dropzone               
                    *  Nota: es obligatorio definir la clase dropzone. 
                     */
                }

        {   
            // Si hay archivos
            acceptedFiles.length > 0 ? 
                (   
                    <div className="mt-10 w-full">
                        <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                        <ul>
                            {archivos}
                        </ul>
                        <button 
                            type="button"
                            className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                            onClick={() => crearEnlace()}
                        >
                            Crear Enlace
                        </button>
                       

                    </div>
                    
                )
            : 
             // Si no hay archivos
            ( 
                <div { ...getRootProps({ className: 'dropzone w-full py-32' }) }>
                    <input className="h-100 " { ...getInputProps() } />

                    {   
                        /**
                         *  NOta: isDragActive Ayuda a detectar si se esta arrastrando algun elemento
                         * 
                         */
                            isDragActive ?
                            
                            <p className="text-2xl text-center text-gray-600">Suelta el archivo</p> 
                            
                            : 

                            <div className="text-center"> 
                                <p className="text-2xl text-center text-gray-600">
                                    Seleciona un archivo y arrastralo aquí
                                </p>
                                <button 
                                    className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" 
                                    type="button"
                                >
                                    Seleciona archivos para subir
                                </button>
                            </div>
                    }    
                </div>
                )
        }
       

            

        </div>
      );
 }
  
 export default Dropzone;


