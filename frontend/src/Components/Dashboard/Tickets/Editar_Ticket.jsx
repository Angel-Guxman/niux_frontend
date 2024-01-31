import React from 'react';
import TynnyComponent from './TynnyComponent';

const Editar_Ticket = () => {
    return (
        <div className="bg-green-100 p-4 rounded-md border border-green-800">
            <div className="flex items-center">
            <span className=" mr-5 flex items-center justify-center w-16 h-16 bg-blue-100 uppercase text-blue-600 rounded-md font-bold border border-blue-600/30">
    AG
  </span>
                <div className="font-semibold text-xl">Garcia Leyva Andres</div>
                
            </div>

            <div className="mt-4">
                <label htmlFor="titulo" className="block text-gray-600 font-medium mb-2">Titulo <span className="text-red-500">*</span></label>
                <input type="text" id="titulo" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>

            <div className="mt-4">
                <label htmlFor="descripcion" className="block text-gray-600 font-medium mb-2">Descripción <span className="text-red-500">*</span></label>
                <TynnyComponent className="w-full p-2 border border-gray-300 rounded-md  "/>
            </div>
            <hr className="my-8 border-gray-500/30" />
            <div className="mt-4 flex items-center">
                <div className="text-gray-600 mr-2">Archivo(s) (512 MB máximo)</div>
                <button className="bg-green-500 text-white px-3 py-1 rounded-md">Elegir archivos</button>
            </div>
            <hr className="my-8 border-gray-500/30" />
            <div className="mt-4">
                <button type="submit" className="w-[150px]  font-poppins bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors">
                Guardar
              </button>
            </div>
        </div>
    );
};

export default Editar_Ticket;
