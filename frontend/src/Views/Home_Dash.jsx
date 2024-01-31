import { Link } from 'react-router-dom';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Card_Tickets from '../Components/Dashboard/Card_Tickets';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/Auth/authStore';
const Home_Dash = () => {
  const [loading, setLoading] = useState(true); // Añade este estado

  const user = useAuthStore((state) => state.user?.fullName || 'No user');
  useEffect(() => {
    // Simula una carga con setTimeout, aquí deberías hacer tu llamada a la API o carga de datos.
    const timer = setTimeout(() => {
      setLoading(false); // Cambia el estado de loading después de 3 segundos
    }, 300);

    // Limpia el timeout si el componente se desmonta antes de que se complete
    return () => clearTimeout(timer);
  }, []); // Con [] como segundo argumento, useEffect se ejecuta una vez cuando el componente se monta.

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
      )}
      {!loading && (
        <div>
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl text-gray-900">¡Bienvenido {user}!</h1>

            <div className="flex items-center gap-2 text-3xl">
              <RiArrowLeftSLine className="hover:cursor-pointer hover:text-white transition-colors" />
              <RiArrowRightSLine className="hover:cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {/* Card */}
            <Card_Tickets ticket="close" totalTickets="10,000" text="Tickets Nuevos" />
            <Card_Tickets ticket="pending" totalTickets="5,000" text="Tickets en Espera" />
            <Card_Tickets ticket="inProcess" totalTickets="13,000" text="Tickets en proceso" />
            <Card_Tickets ticket="resuelto" totalTickets="1,000" text="Tickets Resueltos" />
            <Card_Tickets ticket="total" totalTickets="14,000" text="Tickets Cerrados" />
          </div>

          <div>
            <h1 className="text-2xl text-gray-900 my-10">Tickets más recientes</h1>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="text-white px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="text-white px-6 py-3">
                    TITULO
                  </th>
                  <th scope="col" className="text-white px-6 py-3 text-center">
                    UBICACION
                  </th>
                  <th scope="col" className="text-white px-6 py-3 text-center">
                    SOLICITANTE
                  </th>
                  <th scope="col" className="text-white px-6 py-3 text-center">
                    ESTADO
                  </th>
                  <th scope="col" className="text-white px-6 py-3 text-center">
                    Fecha Apertura
                  </th>
                  <th scope="col" className="text-white px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    0001
                  </th>
                  <Link to="/dashboard/add-ticket" className="flex items-center">
                    <td className="px-6 py-4">Mi computadora no enciende</td>
                  </Link>
                  <td className="px-6 py-4">Publico en general</td>
                  <td className="px-6 py-4">Lorena Hernandez</td>
                  <td className="flex flex-col items-center justify-center bg-green-500/30 text-green-500 rounded-lg mt-3">Nuevo</td>
                  <td className="px-6 py-4 text-center">10/10/2023</td>
                  <td className="px-6 py-4 text-right">
                    <Link to="/dashboard/add-ticket" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    0002
                  </th>
                  <Link to="/dashboard/add-ticket" className="flex items-center">
                    <td className="px-6 py-4">Mi computadora no enciende</td>
                  </Link>
                  <td className="px-6 py-4">Publico en general</td>
                  <td className="px-6 py-4">Omar Caballero</td>
                  <td className="flex flex-col items-center justify-center bg-green-500/30 text-green-500 rounded-lg mt-3">Nuevo</td>
                  <td className="px-6 py-4 text-center">10/10/2023</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home_Dash;
