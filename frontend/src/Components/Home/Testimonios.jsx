import  { useState } from 'react';
import '../../Styles/Home.css';

const testimoniosData = [
  { id: 1, nombre: 'PC Gamer', url: '../../../public/Images/carruselCuatro_home.png' },
  { id: 2, nombre: 'María',url: '../../../public/Images/carruselCinco_home.png' },
  { id: 2, nombre: 'juan',url: '../../../public/Images/carruselCinco_home.png' },
  { id: 2, nombre: 'angel',url: '../../../public/Images/carruselCinco_home.png' },
  { id: 2, nombre: 'hey',url: '../../../public/Images/carruselCinco_home.png' },
  { id: 2, nombre: 'Mía',url: '../../../public/Images/carruselCinco_home.png' },

  // ...otros testimonios
];

function Testimonios() {
  const [indiceActual, setIndiceActual] = useState(0);

  const handleMouseMove = (event) => {
    const width = event.currentTarget.offsetWidth;
    const x = event.clientX - event.currentTarget.offsetLeft;

    if (x < width / 2 && indiceActual > 0) {
      // Mover a la izquierda
      setIndiceActual(indiceActual - 1);
    } else if (x > width / 2 && indiceActual < testimoniosData.length - 1) {
      // Mover a la derecha
      setIndiceActual(indiceActual + 1);
    }
  };

  return (
    <div className="testimonios" onMouseMove={handleMouseMove}>
      <div className="testimonio">
        <h3>{testimoniosData[indiceActual].nombre}</h3>
        <img src={testimoniosData[indiceActual].url} className=' h-32 w-32'></img>
      </div>
    </div>
  );
}

export default Testimonios;
