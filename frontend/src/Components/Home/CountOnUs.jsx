import '../../Styles/CountOnUs.css'
import VideoUno from '../../../public/Images/count-on-us-uno.mp4'
import VideoDos from '../../../public/Images/count-on-us-dos.mp4'
import VideoTres from '../../../public/Images/count-on-us-tres.mp4'
import VideoCuatro from '../../../public/Images/count-on-us-cuatro.mp4'
import VideoCinco from '../../../public/Images/count-on-us-cinco.mp4'
import { useRef } from 'react'
export const CountOnUs = () => {
    const videoRefUno = useRef(null);
    const videoRefDos = useRef(null);
    const videoRefTres = useRef(null);
    const videoRefCuatro = useRef(null);
    const videoRefCinco = useRef(null);

    // Función para manejar cuando el cursor entra en el video (hover)
    const handleMouseEnter = (videoRef) => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    // Función para manejar cuando el cursor sale del video
    const handleMouseLeave = (videoRef) => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };
  return (
    <>
    <div className=' bg-white mt-9 pb-4'>
    <h1 className=' text-gray-600 font-poppins text-4xl p-8 '>
        Cuenta Con Nosotros
    </h1>
    <div className="grid  h-[1520px] sm:h-[950px] lg:h-[700px] lg:grid-flow-row-dense  gap-4 mx-4 sm:grid-cols-2    md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4">
        <div className=' relative row-span-3 lg:row-span-4 '>
        <video
        ref={videoRefUno}
      className="w-full h-full object-cover  transition duration-300 absolute z-10 brightness-95 hover:brightness-105 rounded-xl" // Clases de Tailwind para estilizar el video
      loop
      muted
      src={VideoUno}
      onMouseEnter={() => handleMouseEnter(videoRefUno)}
      onMouseLeave={() => handleMouseLeave(videoRefUno)}
      />
       <div className="absolute z-10 inset-0 flex justify-center items-center text-white opacity-0 hover:opacity-100 transition duration-300 text-4xl font-bold  text-center "  onMouseEnter={() => handleMouseEnter(videoRefUno)}
      onMouseLeave={() => handleMouseLeave(videoRefUno)}>
       Servicios que marcan la diferencia
    </div>
        </div>
        <div className='relative  lg:row-span-2 sm:row-span-2 '>
        <video
        ref={videoRefDos}
      className="w-full h-full object-cover  transition duration-300 absolute z-10 brightness-95 hover:brightness-105 rounded-xl" // Clases de Tailwind para estilizar el video
      loop
      muted
      src={VideoDos}
      onMouseEnter={() => handleMouseEnter(videoRefDos)}
                        onMouseLeave={() => handleMouseLeave(videoRefDos)}
                        />   
                         <div className="absolute z-10 inset-0 flex justify-center items-center text-white opacity-0 hover:opacity-100 transition duration-300 lg:text-5xl font-bold text-4xl text-center"  onMouseEnter={() => handleMouseEnter(videoRefDos)}
                        onMouseLeave={() => handleMouseLeave(videoRefDos)}>
                         Creando soluciones para ti
    </div>
        </div>
        <div className='relative lg:row-span-1 row-span-1 '>
        <video
        ref={videoRefTres}
      className="w-full h-full object-cover  transition duration-300 absolute z-10 brightness-95 hover:brightness-105 rounded-xl" // Clases de Tailwind para estilizar el video
      loop
      muted
      src={VideoTres}
      onMouseEnter={() => handleMouseEnter(videoRefTres)}
      onMouseLeave={() => handleMouseLeave(videoRefTres)}
      /> 
       <div className="absolute z-10 inset-0 flex justify-center items-center text-white opacity-0 hover:opacity-100 transition duration-300 text-4xl font-bold text-center" onMouseEnter={() => handleMouseEnter(videoRefTres)}
      onMouseLeave={() => handleMouseLeave(videoRefTres)}>
       Innovación en cada solución
    </div> 
        </div>
        <div className='relative lg:row-span-1 sm:row-span-2 sm:col-span-2 lg:col-span-1'>
        <video
        ref={videoRefCuatro}
        className="w-full h-full object-cover  transition duration-300 absolute z-10 brightness-95 hover:brightness-105 rounded-xl" // Clases de Tailwind para estilizar el video
      loop
      muted
      src={VideoCuatro}
      onMouseEnter={() => handleMouseEnter(videoRefCuatro)}
      onMouseLeave={() => handleMouseLeave(videoRefCuatro)}
    />  
     <div className="absolute z-10 inset-0 flex justify-center items-center text-white opacity-0 hover:opacity-100 transition duration-300 lg:text-4xl font-bold text-3xl sm:text-5xl text-center"  onMouseEnter={() => handleMouseEnter(videoRefCuatro)}
      onMouseLeave={() => handleMouseLeave(videoRefCuatro)}>
     Compromiso inquebrantable
    </div>
        </div>
        <div className=' relative  col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2'>
        <video
        ref={videoRefCinco}
      className="w-full h-full object-cover  transition duration-300 absolute z-10 brightness-95 hover:brightness-105 rounded-xl"  // Clases de Tailwind para estilizar el video
      loop
      muted
      src={VideoCinco}
      onMouseEnter={() => handleMouseEnter(videoRefCinco)}
      onMouseLeave={() => handleMouseLeave(videoRefCinco)}
      />
       <div className="absolute z-10 inset-0 flex justify-center items-center text-white opacity-0 hover:opacity-100 transition duration-300 text-5xl font-bold text-center"  onMouseEnter={() => handleMouseEnter(videoRefCinco)}
      onMouseLeave={() => handleMouseLeave(videoRefCinco)}>
       Siempre un paso adelante
    </div>
        </div>


    </div>
      </div>
    </>
  )
}
