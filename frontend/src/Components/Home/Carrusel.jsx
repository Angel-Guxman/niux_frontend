import { useState, useEffect } from 'react';
import '../../Styles/Home.css';
import { GrNext } from 'react-icons/gr';
import { GrPrevious } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const Carrusel = () => {
  const imagenes = [
    { url: '../../../public/Images/carruselUno_home.png', texto: 'TLaptop Gamer Razer Blade 15', enlace: '/catalogue' },
    { url: '../../../public/Images/carruselDos_home.png', texto: 'Silla Gamer Munfrost Nova Dorado con Blanco', enlace: '/catalogue' },
    { url: '../../../public/Images/carruselTres_home.png', texto: 'UltraHD Gaming Monitor 32 Pulgadas Curvo', enlace: '/catalogue' },
    { url: '../../../public/Images/carruselCuatro_home.png', texto: 'Raspberry Pi 4 Model B 8GB de una sola Placa W1258', enlace: '/catalogue' },
    { url: '../../../public/Images/carruselCinco_home.png', texto: 'Laptop HP ZBook Firefly G9 ', enlace: '/catalogue' },
    { url: '../../../public/Images/carruselSeis_home.png', texto: 'Audífonos inalámbricos On ear | STF Aurum', enlace: '/catalogue' },
    { url: '../../../public/Images/carruselSiete_home.png', texto: 'Gabinete DEEPCOOL CH510 MESH DIGITAL', enlace: '/catalogue' },
    { url: '../../../public/Images/carruselOcho_home.png', texto: 'HP Victus 16.1" FHD IPS Premium Gaming Laptop', enlace: '/catalogue' },

    //... más imágenes y textos
  ];

  const [indiceActual, setIndiceActual] = useState(0);

  const siguienteImagen = () => {
    setIndiceActual((prev) => (prev + 1) % imagenes.length);
  };

  const imagenAnterior = () => {
    setIndiceActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      siguienteImagen();
    }, 5000); // Cambiará la imagen cada 6  segundos
    return () => clearTimeout(timer); // Limpia el temporizador cuando el componente se desmonte
  }, [indiceActual]); // Dependencia: se volverá a ejecutar cada vez que indiceActual cambie

  return (
    <div className="carrusel bg-white mt-9 mb-10">
      <h1 className=" font-popins  text-4xl mb-8 text-gray-600 pl-[16px]">
        Próximos Lanzamientos</h1>
      {imagenes.map((imagen, index) => (
        <Link to={imagen.enlace} key={index}>
          <img src={imagen.url} alt={`imagen del carrusel ${index}`} className={`${indiceActual === index ? 'mostrar' : ''}`} style={{ position: 'absolute' }} /* Las imágenes se superponen */ />
        </Link>
      ))}
      <div className="texto-sobre-imagen">{imagenes[indiceActual].texto}</div>
      <button onClick={imagenAnterior} className=' ml-3 '>
        <GrPrevious size={50}  />
      </button>
      <button onClick={siguienteImagen} className=' mr-3'>
        <GrNext size={50} />
      </button>
    </div>
  );
};

export default Carrusel;
