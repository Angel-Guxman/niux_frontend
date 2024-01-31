import Breadcrums from './Breadcrums';
import Navbar from './Navbar';
import { useState,useRef } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import '../Styles/Contacto.css';
import { RiTruckFill } from 'react-icons/ri';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import { LiaStoreAltSolid } from 'react-icons/lia';
import emailjs from '@emailjs/browser';

function Contacto() {
  const form = useRef();
  const [error, setError] = useState(null);
  const [errorTel, setErrorTel] = useState(null);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  

  const [openQuestion, setOpenQuestion] = useState(null);
  const toggleQuestion = (questionId) => {
    if (openQuestion === questionId) {
      setOpenQuestion(null); // Si la pregunta ya está abierta, ciérrala
    } else {
      setOpenQuestion(questionId); // Si no, ábrela
    }
  };
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoMensaje: '',
    asunto: '',
    mensaje: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el correo electrónico aquí, cuando el usuario hace clic en enviar
    if (!validateEmail(formData.email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return; // Detiene la función aquí si el correo no es válido.
    } else {
      setError(null);
    }
    

    // Aquí podrías procesar el formData, como enviarlo a un servidor
    console.log(formData);
    console.log(formData);
    emailjs.sendForm('service_9ygay8h', 'template_9sq2z18', form.current, 'OWVp3QzPijw30wkZT')
    .then((result) => {
        console.log(result.text);
        form.current.reset();
    }, (error) => {
        console.log(error.text);
    });
  };
  return (
    <>
      <Navbar />
      <Breadcrums />

      <div className="relative w-[100%] h-[1200px] flex flex-col items-center justify-end ">
        <img src="../../public/Images/img_contacto_niux.png" alt="Fondo de contacto" className="w-[100%] h-full blur-sm  " />
        <div className="absolute inset-0 bg-black opacity-30"></div>

        <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-[100%] h-[400px] z-10 space-y-8">
          <h1 className="text-6xl font-bold text-white h-[100px] capitalize animateFromLeft">¡Contactate con nosotros!</h1>
        </div>
        <div className="  mt-4   absolute pb-[70px] ">
          <div className=" border-[4px] border-gray-300 mt-4 p-6  rounded-md bg-neutral-50">
            <h1 className="h-[75.57px]  text-black text-[40px] font-bold mb-4 mx-16 slideFromBottom">¿Cómo podemos ayudarte?</h1>

            <form ref={form} onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" >Nombre</label>
                <input type="text" name="name" required="true" onChange={handleInputChange} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-purple-200 border-[2px] drop-shadow-md hover:drop-shadow-xl " placeholder="Nombre" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                <input required="true" type="email" name="email" onChange={handleInputChange} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-purple-200 border-[2px] drop-shadow-md hover:drop-shadow-xl" placeholder="Correo Electrónico" />
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Celular/Teléfono</label>
                <input pattern="\d+" required="true" type="tel" name="tel" onChange={handleInputChange} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-purple-200 border-[2px] drop-shadow-md hover:drop-shadow-xl" placeholder="Celular/Teléfono" />
                {errorTel && <p className="text-red-500 text-xs italic">{errorTel}</p>}
              </div>
              <div className="mb-4">
                <span className="text-gray-700 font-bold">Tipo de mensaje</span>
                <div className="mt-2 italic">
                  <label className="inline-flex items-center">
                    <input required="true" type="radio" className="form-radio " name="tipoMensaje" value="Solicitud" onChange={handleInputChange} />
                    <span className="ml-2 ">Solicitud</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input type="radio" className="form-radio" name="tipoMensaje" value="Incidencia" onChange={handleInputChange} />
                    <span className="ml-2">Incidencia</span>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Asunto</label>
                <input required="true" type="text" name="asunto" onChange={handleInputChange} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-purple-200 border-[2px] drop-shadow-md hover:drop-shadow-xl" placeholder="Asunto" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Mensaje</label>
                <textarea required="true" name="mensaje" onChange={handleInputChange} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-purple-200 border-[2px] drop-shadow-md hover:drop-shadow-xl textfor" placeholder="Mensaje" rows="4"></textarea>
              </div>
              
              <div className=" text-center">
                <button type="submit" className=" bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-[2px] border-gray-600 wrapper">
                  Enviar
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className=" p-4  ">
        <div className=" bg-neutral-100 lg:grid lg:grid-cols-5  p-5  border-[2px] mb-4 sm:grid sm:grid-cols-1">
          <div className=" lg:col-start-2 text-center lg:w-[800px] sm:grid sm:grid-cols-1 sm:col-start-2 sm:w-[600px]">
            <h1 className=" bg-purple-500 text-gray-100 p-2  font-semibold text-2xl rounded-md mt-3 mb-3 ">Preguntas Frecuentes</h1>
          </div>
          <div className=" lg:col-start-2 lg:w-[800px] sm:grid sm:grid-cols-1 sm:col-start-2 sm:w-[600px] text-start">
            <h1 className=" bg-white p-2  font-semibold text-xl rounded-md border-[3px] text-black flex items-center">
              <button className="pr-[2px]  ">
                <FaArrowCircleRight size={20} className=" text-purple-400 transition ease-in duration-300 hover:scale-110 " onClick={() => toggleQuestion(1)} />
              </button>
              <button onClick={() => toggleQuestion(1)} className="text-center">
                ¿Cuáles son sus opciones de envío y plazos de entrega?
              </button>
            </h1>
            <div className={`transition-all duration-300 ${openQuestion === 1 ? 'visible-content' : 'hidden-content'}`}>
              <RiTruckFill className=" absolute mt-[54px] ml-2 text-purple-500" />
              <AiOutlineThunderbolt className=" absolute mt-[80px] ml-2 text-purple-500" />
              <BiWorld className=" absolute mt-[103px] ml-2 text-purple-500" />
              <LiaStoreAltSolid className=" absolute mt-[150px] ml-2 text-purple-500" />
              <p className="py-4  pr-4 pl-7  mt-2 bg-white border-[2px] text-base">
                Ofrecemos diversas opciones de envío para satisfacer las necesidades de nuestros clientes:
                <br />
                <strong>Envío Estándar: </strong> Esta opción tiene un plazo de entrega de 3 a 5 días hábiles.
                <br />
                <strong>Envío Express:</strong> Si necesitas recibir tu producto con urgencia, esta es la opción para ti.
                <br />
                <strong>Envío Internacional:</strong> Para nuestros clientes fuera del país, ofrecemos envíos internacionales con un plazo de entrega de 7 a 15 días hábiles
                <br />
                <strong>Recogida en Tienda:</strong> Si prefieres recoger tu producto directamente en nuestra tienda o punto de venta, puedes hacerlo dentro de 24 horas después de haber realizado tu compra
              </p>
            </div>
          </div>
          <div className=" lg:col-start-2 text-start lg:w-[800px] sm:grid sm:grid-cols-1 sm:col-start-2 sm:w-[600px]">
            <h1 className=" bg-white p-2  font-semibold text-xl rounded-md border-[3px] text-black flex items-center">
              <button className="pr-[2px] ">
                <FaArrowCircleRight size={20} className=" text-purple-400 transition ease-in duration-300 hover:scale-110 " onClick={() => toggleQuestion(2)} />
              </button>
              <button onClick={() => toggleQuestion(2)}>¿Puedo cancelar o modificar un pedido después de realizarlo?</button>
            </h1>
            <div className={`transition-all duration-300 ${openQuestion === 2 ? 'visible-content' : 'hidden-content'}`}>
              <p className="p-4 mt-2 bg-white border-[2px] text-base">
                Entendemos que a veces las circunstancias cambian y es posible que desees modificar o cancelar tu pedido. A continuación, te explicamos nuestras políticas:
                <br />
                <strong>Modificación del Pedido:</strong> Si deseas agregar o quitar algún artículo de tu pedido, o cambiar alguna especificación (como el color o la capacidad de un dispositivo), puedes hacerlo dentro de las primeras 24 horas después de haber realizado tu compra. Para ello, ponte en contacto con nuestro servicio al cliente a través de [número de teléfono] o [correo electrónico]
                con tu número de pedido y los detalles de la modificación que deseas realizar.
                <br />
                <strong>Cancelación del Pedido:</strong> Puedes solicitar la cancelación de tu pedido dentro de las primeras 48 horas después de la compra. Si tu pedido ya ha sido despachado para el envío, lamentablemente no podremos cancelarlo, pero te ofreceremos opciones para devolución una vez que recibas el producto.
                <br />
                <strong>Pedidos Despachados:</strong> Si tu pedido ya ha sido enviado y deseas cancelarlo o modificarlo, te pedimos esperar a recibirlo y seguir nuestro proceso de devolución.
              </p>
            </div>
          </div>
          <div className="lg:col-start-2 text-start lg:w-[800px] sm:grid sm:grid-cols-1 sm:col-start-2 sm:w-[600px]">
            <h1 className=" bg-white p-2  font-semibold text-xl rounded-md border-[2px] text-black flex items-center">
              <button className="pr-[2px]">
                <FaArrowCircleRight size={20} className=" text-purple-400 transition ease-in duration-300 hover:scale-110 " onClick={() => toggleQuestion(3)} />
              </button>
              <button onClick={() => toggleQuestion(3)}>¿Ofrecen descuentos o promociones especiales?</button>
            </h1>
            <div className={`transition-all duration-300 ${openQuestion === 3 ? 'visible-content' : 'hidden-content'}`}>
              <p className="p-4 mt-2 bg-white border-[2px] text-base">
                ¡Sí, lo hacemos! Siempre buscamos brindar el mejor valor a nuestros clientes, y aquí hay algunas formas en que puedes ahorrar al comprar con nosotros:
                <br />
                <strong>Promociones Temporales:</strong> Regularmente realizamos ofertas y descuentos especiales en determinados productos o categorías. Te recomendamos estar atento a nuestra página principal, banners promocionales y a nuestras redes sociales
                <br />
                <strong>Programa de Lealtad:</strong> Para nuestros clientes más fieles, ofrecemos un programa de lealtad que te permite acumular puntos con cada compra. Estos puntos se pueden canjear por descuentos en futuras compras. ¡Cuanto más compres, más ahorrarás!
                <br />
                <strong>Días Festivos y Fechas Especiales:</strong> Durante ciertas épocas del año, como el Black Friday, Cyber Monday, o fechas festivas, ofrecemos descuentos especiales en una amplia gama de productos.
                <br />
                <strong>Rebajas y Liquidaciones:</strong> Al final de cada temporada, es posible encontrar productos en liquidación con descuentos significativos.
              </p>
            </div>
          </div>
          <div className=" lg:col-start-2 text-start lg:w-[800px] sm:grid sm:grid-cols-1 sm:col-start-2 sm:w-[600px]">
            <h1 className=" bg-white p-2  font-semibold text-xl rounded-md border-[2px] text-black flex items-center">
              <button className="pr-[2px]">
                <FaArrowCircleRight size={20} className=" text-purple-400 transition ease-in duration-300 hover:scale-110 " onClick={() => toggleQuestion(4)} />
              </button>
              <button onClick={() => toggleQuestion(4)}>¿Cómo realizo una compra en su sitio web?</button>
            </h1>
            <div className={`transition-all duration-300 ${openQuestion === 4 ? 'visible-content' : 'hidden-content'}`}>
              <p className="p-4 mt-2 bg-white border-[2px] text-base">
                Comprar en nuestro sitio web es fácil y seguro. Aquí te proporcionamos un paso a paso sobre cómo hacerlo:
                <br />
                <strong>Navega por el Sitio:</strong> Explora nuestras categorías de productos o utiliza la barra de búsqueda si ya sabes lo que estás buscando.
                <br />
                <strong>Selecciona el Producto:</strong> Haz clic en el producto que te interese para ver más detalles, especificaciones y fotos.
                <br />
                <strong>Añade al Carrito:</strong> Una vez que hayas decidido qué producto deseas, haz clic en el botón (Añadir al carrito). Puedes continuar comprando o ir directamente al proceso de pago.
                <br />
                <strong>Carrito de Compras:</strong> Aquí podrás revisar los productos seleccionados, modificar las cantidades o eliminar ítems si así lo decides.
                <br />
                <strong>Proceso de Pago:</strong> Si estás listo para finalizar tu compra, haz clic en (Proceder al pago). Serás dirigido a una página segura donde deberás ingresar tus datos de envío y seleccionar tu método de pago preferido.
                <br />
                <strong>Confirma Tu Pedido:</strong> Una vez que hayas completado tus detalles y seleccionado el método de envío, haz clic en Confirmar pedido.
              </p>
            </div>
          </div>
          <div className="lg:col-start-2 text-start lg:w-[800px] sm:grid sm:grid-cols-1 sm:col-start-2 sm:w-[600px]">
            <h1 className=" bg-white p-2  font-semibold text-xl rounded-md border-[2px] text-black flex items-center">
              <button className="pr-[2px] ">
                <FaArrowCircleRight size={20} className=" text-purple-400 transition ease-in duration-300 hover:scale-110 " onClick={() => toggleQuestion(5)} />
              </button>
              <button onClick={() => toggleQuestion(5)}>¿Qué hago si mi producto llega dañado o defectuoso?</button>
            </h1>
            <div className={`transition-all duration-300 ${openQuestion === 5 ? 'visible-content' : 'hidden-content'}`}>
              <p className="p-4 mt-2 bg-white border-[2px] text-base">
                Lamentamos mucho que hayas tenido esta experiencia. Tu satisfacción es nuestra prioridad, y estamos aquí para ayudarte. Si tu producto llega dañado o presenta algún defecto, por favor sigue estos pasos:
                <br />
                <strong>Documenta el Daño:</strong> Tan pronto como recibas el producto y notes el daño o defecto, toma fotografías claras del empaque, del producto dañado y, si es posible, del número de serie o etiqueta de identificación. Esto nos ayudará a identificar y resolver el problema con mayor eficacia.
                <br />
                <strong>Contacta a nuestro Servicio al Cliente:</strong> Envía un correo electrónico a [niuxservices@gmail.com] o llámanos al [+52 9983763807] dentro de los primeros [4 días] después de haber recibido el producto. Incluye tu número de pedido, una breve descripción del problema y las fotografías que tomaste.
                <br />
                <strong>Devolución o Cambio:</strong> Una vez que recibamos tu reclamo y la evidencia fotográfica, evaluaremos la situación. Si tu producto está dentro del periodo de garantía y cumple con nuestras políticas de devolución.
                <br />
                <strong>Seguimiento:</strong> Nuestro equipo te mantendrá informado sobre el estado de tu reclamo y te proporcionará detalles sobre la reposición o reparación del producto.
              </p>
            </div>
          </div>
          <div className=" lg:col-start-2 text-start lg:w-[800px] sm:grid sm:grid-cols-1 sm:col-start-2 sm:w-[600px]">
            <h1 className=" bg-white p-2  font-semibold text-xl rounded-md border-[2px] text-black flex items-center">
              <button className="pr-[2px] ">
                <FaArrowCircleRight size={20} className=" text-purple-400 transition ease-in duration-300 hover:scale-110 " onClick={() => toggleQuestion(6)} />
              </button>
              <button onClick={() => toggleQuestion(6)}>¿Ofrecen soporte técnico en caso de problemas con el producto?</button>
            </h1>
            <div className={`transition-all duration-300 ${openQuestion === 6 ? 'visible-content' : 'hidden-content'}`}>
              <p className="p-4 mt-2 bg-white border-[2px] text-base">
                Sí, absolutamente. Valoramos a nuestros clientes y queremos asegurarnos de que tengan la mejor experiencia posible con nuestros productos.
                <br />
                <strong>Contacta a nuestro Equipo de Soporte Técnico:</strong> Si no encuentras la solución en nuestro Centro de Ayuda o si tu problema es más específico, puedes comunicarte con nuestro equipo de soporte técnico.
                <br />
                <strong>Información a Proporcionar:</strong> Al contactarnos, asegúrate de tener a mano tu número de pedido y una descripción detallada del problema.
                <br />
                <strong>Soluciones:</strong> Dependiendo de la naturaleza del problema, nuestro equipo podría guiarte a través de pasos para solucionarlo, ofrecerte una actualización de software, o recomendarte que envíes el producto para una reparación o reemplazo bajo garantía.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Contacto;
