import React, {useState, useContext} from 'react'
// Importando app context
import appContext from '../context/app/appContext';


const Formulario = () => {

     // Extraer context app
     const AppContext = useContext(appContext);
     const {agregarPassword,agregarDescarga} = AppContext;

    // Creando un state
    const [tienePassword, setTienePassword] = useState(false);
    

    return ( 
        <div className="w-full mt-20">
            
            <div>
                <label className="text-lg text-gray-800">Eliminar Tras:</label>
                <select className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:boder-gray-500"
                    onChange={e => agregarDescarga(parseInt(e.target.value))}
                >
                    <option value="" selected disabled>--- Selecione ---</option>
                    <option value="1">1 Descarga</option>
                    <option value="5">5 Descarga</option>
                    <option value="10">10 Descarga</option>
                    <option value="20">20 Descarga</option>
                </select>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">Proteger con Contraseña</label>
                    <input
                        onChange={() => setTienePassword(!tienePassword)}
                        type="checkbox" />
                </div>
                {
                    tienePassword && (<input 
                        onChange={e => agregarPassword(e.target.value)}
                        type="password" 
                        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 ounded leading-none focus:outline-none focus:boder-gray-500" />)

                }
                

            </div>
           
        </div>


     );
}
 
export default Formulario;