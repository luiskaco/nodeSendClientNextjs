import React from 'react';
import Layout from '../components/Layout';
// Importar formik
import { useFormik} from 'formik';
// Importar yup
import * as Yup from 'yup';

const Index = () => {
    
    // Formulario  y validacion con formik y yup

    const formik = useFormik({
        // Valores iniciales de los input
        initialValues : {
            email: '',
            password: ''
        },
        // Esquema de validacion
        validationSchema: Yup.object({     
            email     : Yup.string().email('El campo email no cumple con el formato.').required('El campo Email es obligatorio. '),   
            password  : Yup.string().required('El campo password es obligatorio y no puede ir vacio. '),
            
        }),
        // handle del submit
        onSubmit: valores => {
            console.log(valores);
        }
    });

  return ( 
    <Layout>
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      <div className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
         Iniciar Sesión
      </div>

      <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
              <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                  /** MAnejo de evento */
                  onSubmit={formik.handleSubmit}
              >
                
                  <div className="mb-4">
                      <label className="block text-black text-sm font-bold mb-2"
                      htmlFor="Email"
                      >Email
                      </label>
                      <input
                              type="email"
                              className="shadow appereance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="email"
                              placeholder="Ingresa correo Usuario"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}

                          ></input>
                        {   
                           /** imprimir errores de formik y yup ***/
                          formik.touched.email && formik.errors.email ? 
                          (
                              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                  <p className="font-bold">Error</p>
                                  <p>{formik.errors.email}</p>
                              </div>
                          ) : null
                      }
                  </div>
                  <div className="mb-4">
                      <label className="block text-black text-sm font-bold mb-2"
                      htmlFor="Password"
                      >Password
                      </label>
                      <input
                              type="password"
                              className="shadow appereance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="password"
                              placeholder="Ingresa Contraseña Usuario"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}

                          ></input>
                        {   
                           /** imprimir errores de formik y yup ***/
                          formik.touched.password && formik.errors.password ? 
                          (
                              <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                  <p className="font-bold">Error</p>
                                  <p>{formik.errors.password}</p>
                              </div>
                          ) : null
                      }
                  </div> 

                  <input 
                      type="submit"
                      className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                      value="Iniciar Sesión"
                  /> 
              </form>
          </div>
      </div>
    </div>
</Layout>
   );
}
 
export default Index;