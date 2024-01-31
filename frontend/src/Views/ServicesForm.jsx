import { useState } from 'react';
import useFormStore from '../stores/formStore';
import Navbar from './Navbar';
import Breadcrums from './Breadcrums';
import '../Views/Services';
import { MdOutlineMiscellaneousServices } from 'react-icons/md';
import { useEffect } from 'react';
import { niuxApi } from '../api/niuxApi';
import { useNavigate } from 'react-router-dom';

export const ServicesForm = () => {
  const navigate = useNavigate();
  const getFormState = useFormStore((state) => state.form);
  console.log(getFormState);
  const [formData, setFormData] = useState({
    applicant: '',
    title: '',
    description: '',
    type: '',
    category: '',
  });

  

  useEffect(() => {
    if (getFormState) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: getFormState,
      }));
    }
  }, [getFormState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(formData);
    try {
      const response = await niuxApi.post('/tickets', formData);

      // Procesar la respuesta aquí
      console.log('Ticket creado con éxito', response.data);

      // Restablecer el formulario
      setFormData({
        applicant: '',
        title: '',
        description: '',
        type: '',
        category: '',
      });
      navigate('/services');
    } catch (error) {
      console.error('Error al crear el ticket:', error);
      // Manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
    }
  };

 
  return (
    <>
      <Navbar />
      <Breadcrums />
      <div className={` relative top-0  left-0 right-0 bottom-0 z-0 flex justify-center items-center p-8  inset-0  bg-form `}>
        <div className="relative w-full max-w-2xl">
          {/* Modal content */}
          <div
            className=" bg-white rounded-lg shadow dark:bg-gray-700 pb-4 border border-gray-500
      "
          >
            {/* Modal header */}
            <div className="flex items-center justify-center p-4  border-gray-300 border-b-[2px] rounded-t ">
              <h3 className="text-2xl font-semibold text-gray-900 mr-4 ">Formulario</h3>
              <MdOutlineMiscellaneousServices size={25} className=" text-purple-500" />
            </div>
            {/* Formulario body */}
            <div className="w-full max-w-md mx-auto mt-10 ">
              <form onSubmit={handleSubmit} className=" shadow-2xl border border-black rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                  <input className="shadow appearance-none focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[2px] border-purple-300" id="name" type="text" name="applicant" required value={formData.applicant} onChange={handleChange} placeholder="Nombre completo " />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" >
                    Asunto
                  </label>
                  <input className="shadow appearance-none focus:border-purple-500 border-[2px] border-purple-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Asunto" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Mensaje
                  </label>
                  <textarea className="shadow appearance-none focus:border-purple-500 border-[2px] border-purple-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Escribe tu mensaje aquí" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                    Tipo
                  </label>
                  <select className="shadow appearance-none focus:border-purple-500 border-[2px] border-purple-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="type" name="type" value={formData.type} onChange={handleChange}>
                  <option value="">----------</option>
                    <option value="Solicitud">Solicitud</option>
                    <option value="Incidencia">Incidencia</option>
                  </select>
                </div>
              
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service">
                    Servicio
                  </label>
                  <input className="shadow appearance-none focus:border-purple-500 border-[2px] border-purple-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="service" type="text" name="category" value={getFormState || 'No seleccionado'} readOnly />
                </div>

                <div className="flex items-center justify-between">
                  <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ServicesForm;
