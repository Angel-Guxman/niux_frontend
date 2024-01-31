import '../../Styles/ScrollMarcas.css';
// Asegúrate de importar las imágenes correctas
import imgUno from '../../../public/Images/apple_logo_marcas.svg';
import imgDos from '../../../public/Images/dell-logo-marcas.webp';
import imgTres from '../../../public/Images/hp-logo-marcas.png';
import imgCuatro from '../../../public/Images/Intel-log-marcas.png';
import imgCinco from '../../../public/Images/huawei-logo-marcas.png';
import imgSeis from '../../../public/Images/sony-logo-marcas.jfif';
import imgSiete from '../../../public/Images/nvidia-logo-marcas.png';
import imgOcho from '../../../public/Images/amd-ryzen-logo-marcas.jpg';


// ... (otros imports)

export const ScrollMarcas = () => {
  const images = [
    { src: imgUno, alt: "Marca 1" },
    { src: imgDos, alt: "Marca 2" },
    { src: imgTres, alt: "Marca 3" },
    { src: imgCuatro, alt: "Marca 4" },
    { src: imgCinco, alt: "Marca 5" },
    { src: imgSeis, alt: "Marca 6" },
    { src: imgSiete, alt: "Marca 7" },
    { src: imgOcho, alt: "Marca 8" },





    // ... (otros objetos de imagen)
  ];

  // Duplicamos la lista de imágenes para el efecto infinito
  const allImages = [...images, ...images];

  return (
    <>
    <div className=' bg-neutral-200  my-9 pb-6  px-2'>

     <h1 className=' font-poppins text-4xl text-gray-600 p-[16px]'>
          Marcas Afiliadas
        </h1>
    <div className="left-0 top-0 h-full w-full flex space-y-4 overflow-hidden">
      <div className="marcas-scroll h-[200%] flex gap-4">
        {allImages.map((image, index) => (
          <img src={image.src} alt={image.alt} className="w-full object-cover h-48 bg-white rounded  p-2 border-purple-100 border" key={index} />
          ))}
      </div>
    </div>
    </div>
          </>
  );
}

