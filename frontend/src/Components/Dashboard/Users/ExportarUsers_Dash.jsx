import React, { useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import * as XLSX from 'xlsx';
import { RiFileDownloadLine } from 'react-icons/ri';

const ExportarUsers_Dash = ({ productos }) => {
  const [loading, setLoading] = useState(false);

  const titulo = [{ A: 'Reporte de de Usuarios' }, {}];

  const informacionAdicional = {
    A: 'Creado por: Andres el Sabado, 14 de Octubre del 2023',
  };

  const longitudes = [5, 35, 25, 20, 10, 10, 10];

  const handleDownload = () => {
    setLoading(true);

    let tabla = [
      {
        A: 'Id',
        B: 'Nombre',
        C: 'Correo Electronico',
        D: 'Ubicacion',
        E: 'Rol',
        F: 'Activo',
      },
    ];

    productos.forEach((producto) => {
      tabla.push({
        A: producto.id,
        B: producto.nombre,
        C: producto.correo,
        D: producto.ubicacion,
        E: producto.rol,
        F: producto.activo,
      });
    });

    const dataFinal = [...titulo, ...tabla, informacionAdicional];

    setTimeout(() => {
      creandoArchivo(dataFinal);
      setLoading(false);
    }, 1000);
  };

  const creandoArchivo = (dataFinal) => {
    const libro = XLSX.utils.book_new();

    const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true });

    hoja['!merges'] = [XLSX.utils.decode_range('A1:G1'), XLSX.utils.decode_range('A2:G2'), XLSX.utils.decode_range('A34:G34')];

    let propiedades = [];

    longitudes.forEach((col) => {
      propiedades.push({
        width: col,
      });
    });

    hoja['!cols'] = propiedades;

    XLSX.utils.book_append_sheet(libro, hoja, 'Usuarios');

    XLSX.writeFile(libro, 'ReporteUsuarios.xlsx');
  };

  return (
    <>
      {!loading ? (
        <Button
          className=" flex justify-center items-center py-2 px-6 text-center text-blue-600 relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-10 before:bg-blue-500/30 before:transition-all before:duration-300 hover:before:opacity-0 hover:before:scale-50 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-10 after:opacity-0 after:transition-all after:duration-300 after:border after:border-blue-600 after:scale-125 hover:after:opacity-100 hover:after:scale-100"
          onClick={handleDownload}
        >
          <RiFileDownloadLine className="mr-2" />
          Exportar a Excel
        </Button>
      ) : (
        <Button
          className=" flex justify-center items-center py-2 px-6 text-center text-blue-900 relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-10 before:bg-blue-500/30 before:transition-all before:duration-300 hover:before:opacity-0 hover:before:scale-50 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-10 after:opacity-0 after:transition-all after:duration-300 after:border after:border-blue-600 after:scale-125 hover:after:opacity-100 hover:after:scale-100"
          disabled
        >
          <RiFileDownloadLine className="mr-2" />
          <span> Generando...</span>
          <div role="status" className="ml-2 text-center flex loading-indicator">
            <svg aria-hidden="true" className="inline w-7 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </Button>
      )}
    </>
  );
};

export default ExportarUsers_Dash;
