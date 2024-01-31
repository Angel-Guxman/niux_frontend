
import '../../Styles/OfertasEspeciales.css';
import { useEffect, useRef } from 'react';
import {GrNext} from 'react-icons/gr';
import {GrPrevious} from 'react-icons/gr';
// Ejemplo de datos de productos en oferta. En una aplicación real, estos probablemente serían recuperados de una API.
const ofertas = [
  { id: 1, nombre: 'Smartphone ABC', precioOriginal: '$500', precioDescuento: '$400', imagenUrl: '../../../public/Images/ofertas-especiales-uno.png' },
  { id: 2, nombre: 'Tablet XYZ', precioOriginal: '$300', precioDescuento: '$250', imagenUrl: '../../../public/Images/ofertas-especiales-dos.png' },
  { id: 3, nombre: 'Tablet XYZ', precioOriginal: '$300', precioDescuento: '$250', imagenUrl: '../../../public/Images/ofertas-especiales-tres.png' },
  { id: 4, nombre: 'Tablet XYZ', precioOriginal: '$300', precioDescuento: '$250', imagenUrl: '../../../public/Images/ofertas-especiales-cuatro.png' },
  { id: 5, nombre: 'Tablet XYZ', precioOriginal: '$300', precioDescuento: '$250', imagenUrl: '../../../public/Images/ofertas-especiales-cinco.png' },
  { id: 6, nombre: 'Tablet XYZ', precioOriginal: '$300', precioDescuento: '$250', imagenUrl: '../../../public/Images/ofertas-especiales-seis.png' },
  { id: 7, nombre: 'Tablet XYZ', precioOriginal: '$300', precioDescuento: '$250', imagenUrl: '../../../public/Images/ofertas-especiales-siete.png' },

  // ...otros productos en oferta
];

function OfertasEspeciales() {
  const slider = useRef(null); // Usamos useRef para referenciar el contenedor de productos.
  const handleNext = () => {
    if (slider.current) {
      slider.current.scrollBy({
        left: 300 * 3, // Asumiendo que cada producto tiene un ancho de 300px. Ajusta según sea necesario.
        behavior: "smooth"
      });
    }
  };
  const handlePrevious = () => {
    if (slider.current) {
      slider.current.scrollBy({
        left: -300 * 3, // Asumiendo que cada producto tiene un ancho de 300px. Ajusta según sea necesario.
        behavior: "smooth"
      });
    }
  };
    useEffect(() => {
        const slider = document.querySelector(".ofertasEspeciales");
        let isDown = false;
        let initialDifference = 0; 
        let scrollLeft = 0;

        const startSlide = (e) => {
            if (e.touches && e.touches.length === 2) { // Comprobar si hay dos toques
                isDown = true;
                initialDifference = Math.abs(e.touches[0].pageX - e.touches[1].pageX);
                scrollLeft = slider.scrollLeft;
            }
        };

        const stopSlide = () => {
            isDown = false;
        };

        const doSlide = (e) => {
            if (!isDown || !e.touches || e.touches.length !== 2) return;
            const currentDifference = Math.abs(e.touches[0].pageX - e.touches[1].pageX);
            const walk = (initialDifference - currentDifference) * 3; // Multiplicador de sensibilidad
            slider.scrollLeft = scrollLeft + walk;
        };

        slider.addEventListener("touchstart", startSlide);
        slider.addEventListener("touchend", stopSlide);
        slider.addEventListener("touchmove", doSlide);

        // Limpia los listeners al desmontar el componente
        return () => {
            slider.removeEventListener("touchstart", startSlide);
            slider.removeEventListener("touchend", stopSlide);
            slider.removeEventListener("touchmove", doSlide);
        };
    }, []);
  return (
    <div className=" mt-8  bg-white pb-6 px-4" >
      <h2 className=' text-4xl font-poppins text-gray-600 p-[16px]'>Ofertas Especiales</h2>
      <div className=' relative'>

      <div className="ofertasEspeciales bg-transparent" ref={slider}>
      <div className=" absolute z-10  h-full flex items-center justify-end ">

        <button onClick={handlePrevious} className="">
        <GrPrevious size={45}className="hover:bg-gray-200 px-1 rounded bg-white text-gray-600 ml-1" />
      </button>
          </div>
        {ofertas.map(oferta => (
          <div key={oferta.id} className="oferta border-[1px] border-gray-400  rounded-t-xl  ">
            <img src={oferta.imagenUrl} alt={oferta.nombre} className=' h-[400px] w-[400px]  rounded-t-xl'/>
            <div className=' bg-zinc-100 mt-2 p-1 pl-2'>
            <h3  className=' font-poppins'>{oferta.nombre}</h3>
            <p className="precioOriginal">{oferta.precioOriginal}</p>
            <p className="precioDescuento">{oferta.precioDescuento}</p>
            </div>
          </div>
        ))}
        <div className=" absolute right-0 h-full flex">

<button onClick={handleNext} className="">
<GrNext size={45} className="hover:bg-gray-200 px-1 rounded bg-white text-gray-600 mr-1"/>
</button>
  </div>
      </div>
      
      </div>
    </div>
  );
}

export default OfertasEspeciales;
