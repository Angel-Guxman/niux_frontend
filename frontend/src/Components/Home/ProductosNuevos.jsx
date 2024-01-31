import '../../Styles/ProductosNuevos.css';
import { FaTruck, FaShoppingCart } from 'react-icons/fa';
import { BsFilterRight } from 'react-icons/bs';
import StarsRating from '../Shop/StarsRating';
import { useEffect, useRef } from 'react';
import { GrNext } from 'react-icons/gr';
import { GrPrevious } from 'react-icons/gr';

function ProductosNuevos() {
  const slider = useRef(null); // Usamos useRef para referenciar el contenedor de productos.
  const handleNext = () => {
    if (slider.current) {
      slider.current.scrollBy({
        left: 300 * 3, // Asumiendo que cada producto tiene un ancho de 300px. Ajusta según sea necesario.
        behavior: 'smooth',
      });
    }
  };
  const handlePrevious = () => {
    if (slider.current) {
      slider.current.scrollBy({
        left: -300 * 3, // Asumiendo que cada producto tiene un ancho de 300px. Ajusta según sea necesario.
        behavior: 'smooth',
      });
    }
  };
  const products = [
    {
      id: 1,
      name: 'Raspberry Pi 4 Model B 8GB de una sola Placa W125890212212',
      href: '#',
      imageSrc: '../../../public/Images/productos-nuevos-uno.png',
      imageAlt: "Front of men's RTX 4090 ASUS ROG STRIX in black.",
      price: '4,999',
      stock: 15,
      rating: 5,
      shipping: 'Envío gratis',
    },
    {
      id: 2,
      name: 'UltraHD Gaming Monitor 32 Pulgadas Curvo HDR 1000 HDMI DisplayPort USB-C',
      href: '#',
      imageSrc: '../../../public/Images/productos-nuevos-dos.png',
      imageAlt: "Front of men's RTX 4090 ASUS ROG STRIX in black.",
      price: '4,999',
      stock: 21,
      rating: 5.0,
      shipping: 'Envío gratis',
    },
    {
      id: 3,
      name: 'Teclado Mecánico Cherry MX Retroiluminado RGB USB 2.0',
      href: '#',
      imageSrc: '../../../public/Images/productos-nuevos-tres.png',
      imageAlt: "Front of men's RTX 4090 ASUS ROG STRIX in black.",
      price: '4,999',
      stock: 300,
      rating: 3.0,
      shipping: 'Envío gratis',
    },

    {
      id: 4,
      name: 'Tarjeta Gráfica NVIDIA GeForce RTX 3080 Ti 12GB GDDR6X PCI-E 4.0',
      href: '#',
      imageSrc: '../../../public/Images/productos-nuevos-cuatro.png',
      imageAlt: "Front of men's RTX 4090 ASUS ROG STRIX in black.",
      price: '4,999',
      stock: 100,
      rating: 2.0,
      shipping: 'Envío gratis',
    },
    {
      id: 5,
      name: 'SSD NVMe M.2 1TB PCIe 4.0 3D NAND TLC Velocidad de Lectura 5000MB/s',
      href: '#',
      imageSrc: '../../../public/Images/productos-nuevos-cinco.png',
      imageAlt: "Front of men's RTX 4090 ASUS ROG STRIX in black.",
      price: '4,999',
      stock: 21,
      rating: 2.5,
      shipping: 'Envío gratis',
    },
    {
      id: 6,
      name: 'Procesador AMD Ryzen 9 5950X 16 Núcleos 32 Hilos 4.9GHz Socket AM4',
      href: '#',
      imageSrc: '../../../public/Images/productos-nuevos-seis.png',
      imageAlt: "Front of men's RTX 4090 ASUS ROG STRIX in black.",
      price: '4,999',
      stock: 31,
      rating: 1.5,
      shipping: 'Envío gratis',
    },
    {
      id: 7,
      name: 'Mouse Gaming Inalámbrico Recargable con Sensor Óptico 16000 DPI RGB',
      href: '#',
      imageSrc: '../../../public/Images/productos-nuevos-siete.png',
      imageAlt: "Front of men's RTX 4090 ASUS ROG STRIX in black.",
      price: '4,999',
      stock: 71,
      rating: 4.5,
      shipping: 'Envío gratis',
    },
    {
      id: 8,
      name: 'Silla Gaming Ergonómica Ajustable con Reposapiés Masajeador Bluetooth',
      href: '#',
      imageSrc: '../../../public/Images/productos-nuevos-ocho.png',
      imageAlt: "Front of men's RTX 4090 ASUS ROG STRIX in black.",
      price: '4,999',
      stock: 45,
      rating: 3.9,
      shipping: 'Envío gratis',
    },
    {
      id: 9,
      name: 'Placa Base ATX ASUS ROG Strix B550-F Gaming Wi-Fi 6 Bluetooth 5.1',
      href: '#',
      imageSrc: '../../../public/Images/productos-nuevos-nueve.png',
      imageAlt: "Front of men's RTX 4090 ASUS ROG STRIX in black.",
      price: '4,999',
      stock: 12,
      rating: 4.7,
      shipping: 'Envío gratis',
    },
  ];
  useEffect(() => {
    const slider = document.querySelector('.productosNuevos');
    let isDown = false;
    let initialDifference = 0;
    let scrollLeft = 0;

    const startSlide = (e) => {
      if (e.touches && e.touches.length === 2) {
        // Comprobar si hay dos toques
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

    slider.addEventListener('touchstart', startSlide);
    slider.addEventListener('touchend', stopSlide);
    slider.addEventListener('touchmove', doSlide);

    // Limpia los listeners al desmontar el componente
    return () => {
      slider.removeEventListener('touchstart', startSlide);
      slider.removeEventListener('touchend', stopSlide);
      slider.removeEventListener('touchmove', doSlide);
    };
  }, []);
  return (
    <>
      <div className="mx-auto  px-4 py-10 sm:px-6 sm:py-18 lg:px-6 abs  mt-28 bg-white">
        <div className="flex items-center justify-between">
          <h1 className="mt-[-35px] font-popins text-4xl  mb-4 text-gray-600 w-full">Productos Nuevos</h1>

          <button className="mt-[-30px] ml-1 mr-[-10px] flex items-center h-38 w-[72px] text-center rounded-[5px] font-semibold bg-gradient-to-b text-[40px] text-gray-700 ">
            <BsFilterRight className="mr-1" />
          </button>
        </div>
        <div className=" relative">
          <div className="  productosNuevos mt-2 gap-x-6 gap-y-2  xl:gap-x-2 " ref={slider}>
            <div className=" absolute z-10  h-full flex items-center justify-end ">
              <button onClick={handlePrevious} className="prevButton ">
                <GrPrevious size={45} className="hover:bg-gray-200 px-1 rounded bg-white text-gray-600 ml-1" />
              </button>
            </div>
            {products.map((product) => (
              <div key={product.id} className="border-gray-200 border-[0.5px] rounded-[5px] group relative">
                <div className=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 transition ease-in duration-300 hover:scale-105">
                  <a href={product.href}>
                    <img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                  </a>
                </div>

                <div className="p-1 mt-1 flex ml-2 mb-2">
                  <div>
                    <h3 className="text-[15px] font-semibold text-gray-700">
                      <span aria-hidden="true" className="absolute" />
                      {product.name.length >= 54 ? `${product.name.substring(0, 50)}...` : product.name}
                    </h3>

                    <p className="text-[15px] text-gray-500">Piezas: {product.stock} disponibles</p>
                    <p className="text-[20px] mt-0 font-bold text-purple-600">$ {product.price}</p>

                    <div className="flex items-center">
                      <p className="flex items-center h-38 w-[105px] text-center rounded-[5px] font-semibold bg-gradient-to-b text-[14px] from-purple-600 via-purple-600 to-purple-500 text-white">
                        <FaTruck className="ml-1 mr-1" /> {product.shipping}
                      </p>

                      <button className="ml-1 flex items-center h-38 w-[72px] text-center rounded-[5px] font-semibold bg-gradient-to-b text-[14px] from-blue-500 via-blue-500 to-blue-500 text-white">
                        <FaShoppingCart className="mr-1 ml-1" /> Añadir
                      </button>
                    </div>

                    <StarsRating ratingNumber={product.rating} />
                  </div>
                </div>
              </div>
            ))}
            <div className=" absolute right-0 h-full flex">
              <button onClick={handleNext} className="nextButton">
                <GrNext size={45} className="hover:bg-gray-200 px-1 rounded bg-white text-gray-600 mr-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductosNuevos;
