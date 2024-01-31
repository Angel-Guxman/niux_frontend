import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import Navbar from './Navbar';
import Breadcrums from './Breadcrums';
import ImageGallery from 'react-image-gallery';
import { AiFillLock } from 'react-icons/ai';
import { FaTruck, FaShoppingCart } from 'react-icons/fa';
import { RiRefund2Line } from 'react-icons/ri';
import { MdOutlineFavorite } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCartStore } from '../stores/shop/cartStore';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useAuthStore } from '../stores/Auth/authStore';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Viewproduct = () => {
  const { name } = useParams();
  const [product, setProduct] = useState({});
  const [productBrand, setProductBrand] = useState([]);
  const [images, setImages] = useState([]);
  const useUser = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  const reloadCart = useCartStore((state) => state.reloadCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProductBySlug(name);
        setProduct(response);
        setProductBrand(response.brand.name.toUpperCase());
        setImages(response.images.map((image) => ({ original: `http://localhost:3000/api/files/product/${image}`, thumbnail: `http://localhost:3000/api/files/product/${image}` })));
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = async () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = async (productId) => {
    if (!useUser) navigate('/login');
    await productService.setProductCart(productId, count);
    reloadCart();
    navigate('/cart');
  };

  const imageStyle = {
    objectFit: 'cover',
    maxHeight: '300px',
    margin: '0 auto',
    display: 'block',
  };

  const addToPay = async (productId) => {
    if (!useUser) navigate('/login');
    await productService.setProductCart(product.id, 1);
    reloadCart();
    navigate('/cart');
  };

  return (
    <div className="bg-white">
      <Navbar />
      <Breadcrums />

      <div className="pt-1">
        {/* Product info */}

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"></div>

          {/* Contenido de la galería de imágenes */}
          <div className="lg:hidden rounded-lg mb-8">{<ImageGallery showPlayButton={false} items={images} />}</div>

          {/* Options */}

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <h1 className="w-full text-2xl font-bold text-gray-700 sm:text-2xl">{product.title}</h1>

            <h2 className="text-orange-600 font-semibold">Marca: {productBrand} </h2>
            <p className="text-gray-600 font-normal">Productos disponibles: ({product.stock})</p>
            <p className="mt-4 text-3xl text-purple-600 font-bold">$ {product.price}</p>

            {/* Reviews */}
            <div className="mt-4">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 5].map((rating) => (
                    <StarIcon key={rating} className={classNames(product.rating > rating ? 'text-purple-600' : 'text-gray-200', 'h-5 w-5 flex-shrink-0')} aria-hidden="true" />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>

              {/* Contador */}
              <div className="gap-1 mt-4 flex items-center text-gray-700">
                <button className="rounded-[10px] bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 flex items-center justify-center w-10" onClick={decrement}>
                  -
                </button>
                <span className="rounded-[10px] flex items-center justify-center bg-gray-200 h-10 text-lg font-normal w-10 text-center py-2 px-4">{count}</span>
                <button className="rounded-[10px] bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4" onClick={increment}>
                  +
                </button>

                <button type="submit" className={`w-52 justify-center items-center flex text-center rounded-[10px] bg-purple-700 hover:bg-purple-500'} text-white font-semibold py-2 px-4 flex-shrink-0`} onClick={() => (count >= 1 ? handleClick(product.id) : null)}>
                  <FaShoppingCart className="mr-2" />
                  Agregar al carrito
                </button>

                <button className={`ml-1 rounded-[10px] flex items-center justify-center text-center border-gray-300 py-4 px-2 w-10 h-10 border-[2px] ${isFavorite ? 'text-red-500' : 'text-gray-500'}`} onClick={() => setIsFavorite(!isFavorite)}>
                  <MdOutlineFavorite size={20} />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <button onClick={() => addToPay(product.id)} type="submit" className="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-bold">
                Comprar
              </button>
              <button type="submit" className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-300 px-8 py-3 text-base text-purple-600 hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 font-bold">
                Ver métodos de pago
              </button>
            </div>
            {/* Certificaciones */}
            <div className="flex items-center gap-10 justify-center">
              <div className="flex flex-col items-center">
                <div className="mt-4 flex items-center justify-center py-3 px-6 text-gray-700 text-lg border-gray-300 rounded-full w-24 h-24 btn-lg border-[3px]">
                  <AiFillLock size={40} />
                </div>
                <p className="text-center mt-2 text-gray-700 text-md">Transacción segura</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="mt-5 flex items-center justify-center py-3 px-6 text-gray-700 text-lg border-gray-300 rounded-full w-24 h-24 btn-lg border-[3px]">
                  <FaTruck size={40} />
                </div>
                <p className="mt-2 text-gray-700 text-md text-center">Envío protegido</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="mt-5 flex items-center justify-center py-3 px-6 text-gray-700 text-lg border-gray-300 rounded-full w-24 h-24 btn-lg border-[3px]">
                  <RiRefund2Line size={40} />
                </div>
                <p className="mt-2 text-gray-700 text-md text-center">Ofrece reembolso</p>
              </div>
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div className="hidden lg:block rounded-lg">
              {
                <ImageGallery
                  showFullscreenButton={false}
                  disableThumbnailScroll={true}
                  showNav={false}
                  thumbnailPosition="left"
                  showPlayButton={false}
                  items={images.map((image) => ({
                    ...image,
                    renderItem: (item) => (
                      <div className="image-gallery-image">
                        <img src={item.original} alt={item.description} style={imageStyle} />
                      </div>
                    ),
                  }))}
                />
              }
            </div>
            {/* Description and details */}

            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewproduct;
