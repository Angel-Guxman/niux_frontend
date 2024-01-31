import  { useEffect, useState } from 'react';
// Icons
import {
  RiEdit2Line,
} from "react-icons/ri";
import { useParams } from 'react-router-dom';
import { niuxApi } from '../../../api/niuxApi';

const EditarServicio = () => {
  const [loading, setLoading] = useState(true);
  const { serviceId } = useParams();
  const [serviceData, setServiceData] = useState({
    title: '',
    description: '',
    tags: '',
    image: null
  });

  useEffect(() => {
    const fetchServiceData = async () => {
        try {
            const response = await niuxApi.get(`/services/${serviceId}`);
            setServiceData(response.data);
        } catch (error) {
            console.error("Error al cargar el servicio", error);
            // Agregar manejo de errores aquí...
        } finally {
            setLoading(false);
        }
    };

    if (serviceId) {
        fetchServiceData();
    }
  }, [serviceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prevState => ({
        ...prevState,
        [name]: value
    }));
};


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      await niuxApi.patch(`/services/${serviceId}`, serviceData);
      
      // Agregar manejo de éxito aquí...
  } catch (error) {
      console.error("Error al actualizar el servicio", error);
      // Agregar manejo de errores aquí...
  }
};

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div role="status" className="text-center flex loading-indicator">
            <svg aria-hidden="true" className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}{' '}
      {
       <form onSubmit={handleSubmit}>
       <div className="flex items-center mb-8">
         <div className="w-1/4">
           <p>Avatar</p>
         </div>
         <div className="flex-1">
           <div className="relative mb-2">
             <img
               src="https://img.freepik.com/foto-gratis/negocios-finanzas-empleo-concepto-mujeres-emprendedoras-exitosas-joven-empresaria-segura-anteojos-mostrando-gesto-pulgar-arriba-sostenga-computadora-portatil-garantice-mejor-calidad-servicio_1258-59118.jpg"
               className="w-28 h-28 object-cover rounded-lg"
             />
             <label
               htmlFor="avatar"
               className="absolute bg-gray-100 p-2 rounded-full hover:cursor-pointer -top-2 left-24"
             >
               <RiEdit2Line />
             </label>
             <input type="file" id="avatar" className="hidden" />
           </div>
           <p className="text-gray-500 text-sm">
             Allowed file types: png, jpg, jpeg.
           </p>
         </div>
       </div>
       <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
         <div className="w-full md:w-1/4">
           <p>
             Titulo <span className="text-red-500">*</span>
           </p>
         </div>
         <div className="flex-1 flex items-center gap-4">
           <div className="w-full">
             <input
               type="text"
               name='title'
               value={serviceData?.title || ''}
               onChange={handleInputChange}
               className="w-full py-2 px-4 outline-none rounded-lg bg-white"
               placeholder="Titulo"
             />
           </div>
       
         </div>
       </div>

       <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
         <div className="w-full md:w-1/4">
           <p>
                Descripcion <span className="text-red-500">*</span>
           </p>
         </div>
         <div className="flex-1">
           <input
           value={serviceData.description || ''}
           onChange={handleInputChange}
             type="text"
             className="w-full py-2 px-4 outline-none rounded-lg bg-white"
             placeholder="E-mail"
             name='description'
           />
         </div>
       </div>
     
       <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
    <div className="w-full md:w-1/4">
        <p>
            Tag <span className="text-red-500">*</span>
        </p>
    </div>
    <div className="flex-1">
        <select
            name="tags"
            value={serviceData.tags || ''}
            onChange={handleInputChange}
            className="w-full py-2 px-4 outline-none rounded-lg bg-white"
        >
            <option value="Recomendado">Recomendado</option>
            <option value="Premium">Premium</option>
            <option value="Estandar">Estandar</option>
            <option value="Nuevo">Nuevo</option>
        </select>
    </div>
</div>
  
       <hr className="my-8 border-gray-500/30" />
        <div className="flex justify-end">
        
                <button type="submit" className="w-[150px]  font-poppins bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors">
                Guardar
              </button>
           
        </div>
     </form>
     
      }
    </div>
   
  );
};

export default EditarServicio;
