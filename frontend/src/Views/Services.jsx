import Navbar from './Navbar';
import '../Styles/Services.css';
import Breadcrums from './Breadcrums';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFormStore from '../stores/formStore';
import { CgDetailsMore } from 'react-icons/cg';
import { niuxApi } from '../api/niuxApi';
import swal from 'sweetalert';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Services = () => {
  const navigate = useNavigate();
  //aqui se mapea desde la BD
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await niuxApi.get('/services');
        setUsers(response.data); // Asumiendo que la respuesta es un array de usuarios
        setLoading(false);
        console.log(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const [bgblack, setBgblack] = useState();

  // Estado único para manejar el servicio activo y la visibilidad del modal
  const [activeModalInfo, setActiveModalInfo] = useState({ isOpen: false, service: null });

  // Función para abrir el modal con la información del servicio correcto
  const openModalWithService = (service) => {
    setActiveModalInfo({ isOpen: true, service });
    setBgblack(true);
    document.body.style.overflow = 'hidden'; // Evita el desplazamiento en el fondo
  };

  // Función para cerrar el modal y limpiar el servicio activo
  const closeModal = () => {
    setActiveModalInfo({ isOpen: false, service: null });
    setBgblack(false);
    document.body.style.overflow = 'auto'; // Restablece el desplazamiento
  };

  //formstore reparacion de dispositivos
  const setFormData = useFormStore((state) => state.setForm);


  return (
    <>
      <Navbar />
      <Breadcrums />
      <div
        className="relative left-0 top-0 flex justify-center items-center    outline-none focus:outline-none  pb-8 md:px-10 px-8 h-auto 
          "
        id="modal-id"
      >
        <div className={`absolute bg-black  ${bgblack ? 'opacity-80 z-10' : 'opacity-20'} inset-0 h-auto `} />

        <div className="relative min-h-screen flex flex-col items-center justify-center">
          <h1 className=" text-purple-50 text-5xl font-bold mb-6 mt-4">Nuestros Servicios</h1>

          <div className="grid mt-8  gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
            {users
              .filter((user) => user.isActive)
              .map((user) => (
                <div className="flex " key={user.id}>
                  <div className="bg-white shadow-md  rounded-3xl p-4 hover:scale-[1.02] transition ease-in duration-300 w-full ">
                    <div className="flex-none lg:flex">
                      <div className=" h-full w-full lg:h-48 lg:w-48   lg:mb-0 mb-3">
                        <img src="../../public/Images/servicios-uno.jpg" alt="Just a computer" className=" w-full  object-scale-down lg:object-cover  lg:h-48 rounded-2xl" />
                      </div>
                      <div className="flex-auto ml-3 justify-evenly py-2">
                        <div className="flex flex-wrap ">
                          <div className="w-full flex-none text-xs text-purple-700 font-medium ">{user.tags}</div>
                          <h2 className="flex-auto text-lg font-medium">{user.title}</h2>
                        </div>
                        <p className="mt-3" />
                        <div className="flex py-4  text-sm text-gray-500">
                          <div className="flex-1 inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="">Cochin,KL</p>
                          </div>
                          <div className="flex-1 inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="">05-25-2021</p>
                          </div>
                        </div>
                        <div className="flex p-4 pb-2 border-t border-gray-200 " />
                        <div className="flex space-x-3 text-sm font-medium">
                          <div className="flex-auto flex space-x-3">
                            <button onClick={() => openModalWithService(user)} className="mb-2 md:mb-0 bg-white px-4 py-2 shadow-sm tracking-wider border text-gray-600 rounded-full hover:bg-gray-100 inline-flex items-center space-x-2 ">
                              <CgDetailsMore className=" text-purple-600" size={18} />
                              <span>Leer más</span>
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              setFormData(user.title); // Actualiza el estado global
                              navigate('/services/form'); // Navega al formulario
                            }}
                            className="mb-2 md:mb-0 bg-purple-600 px-5 py-2 shadow-sm tracking-wider text-white rounded-full hover:bg-purple-500"
                            type="button"
                            aria-label="like"
                          >
                            Adquirir
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {/* Reparacion Producto Informacion */}
            {activeModalInfo.isOpen && (
              <div key={activeModalInfo.service.id} id="staticModal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className={`fixed mt-[100px]   z-10 flex  justify-center items-center overflow-y-auto p-4 inset-0 h-auto flex-wrap`}>
                <div className=" relative w-[700px] h-auto   ">
                  {/* Modal content */}
                  <div
                    className="relative bg-white rounded-lg shadow flex flex-col h-auto
      "
                  >
                    {/* Modal header */}
                    <div className="flex items-center justify-center text-center p-4 border-b rounded-t bg-purple-500 w-full">
                      <h3 className="text-2xl font-semibold text-white  text-center">{activeModalInfo.service.title}</h3>
                      <button type="button" className="text-white bg-transparent border hover:bg-purple-300 hover:text-white rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" onClick={closeModal}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                      </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-6 space-y-6 ">
                      <p className="text-md leading-relaxed text-gray-600 dark:text-gray-400 font-poppins">{activeModalInfo.service.description}</p>
                    </div>
                    <div className=" flex justify-center ">
                      <img src="../../public/Images/servicios-uno-ref.jpg.png" className=" w-[500px] h-[350px] rounded hover:shadow-2xl mb-4 mt-4" alt="" />
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button data-modal-hide="staticModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bye" onClick={closeModal}>
                        I accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Services;
