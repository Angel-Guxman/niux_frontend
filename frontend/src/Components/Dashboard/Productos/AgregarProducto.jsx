import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiEdit2Line } from 'react-icons/ri';
import { niuxApi } from '../../../api/niuxApi';
import swal from 'sweetalert';

const AgregarProducto = () => {
  const mostrarAlerta = (title, text, icon, timer) => {
    swal({ title, text, icon, button: 'Aceptar', timer });
  };

  // Estados para cada campo del formulario
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState('');

  useEffect(()=>{
    const fetchBrands= async () => {
      try {
        const response = await niuxApi.get('/brands');
        setBrands(response.data)
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBrands();
  })

  useEffect(()=>{
    const fetchCategories= async () => {
      try {
        const response = await niuxApi.get('/categories');
        setCategories(response.data)
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  })

  const handleSelectChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const limpiarFormulario = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setStock('');
    setSelectedBrand('');
    setSelectedCategories('');
  };

  const handleSelectChangeCat = (event) => {
    setSelectedCategories(event.target.value);
  };

  const validarFormulario = () => {
    return title && price && description && stock && selectedBrand && selectedCategories;
  };
  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validarFormulario()) {
      swal('Error', 'Por favor, rellene todos los campos.', 'error');
      return;
    }

    const productData = {
      title,
      price,
      description,
      stock,
      category: selectedCategories, // Update this line
      brand: selectedBrand,
    };

    try {
      const response = await niuxApi.post('/products', productData);
      mostrarAlerta('Éxito', 'Se agregó el producto correctamente.', 'success', 3000);
      limpiarFormulario();
      console.log(response.data);
    } catch (error) {
      console.log(error);
      // Manejo de errores
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="w-full h-16 flex items-center justify-center bg-purple-400 text-white h-18 text-2xl font-bold mb-10">
        <h1>Agregar Nuevo Producto</h1>
      </div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div role="status" className="text-center flex loading-indicator">
            <svg aria-hidden="true" className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </div>
      )}{' '}
      {
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Nombre Producto <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-full">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full py-2 px-4 outline-none rounded-lg bg-white" placeholder="Nombre de producto" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Descripción <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-full">
                <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-40 py-2 px-4 outline-none rounded-lg bg-white" placeholder="Descripcion del producto" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Stock <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <input value={stock} onChange={(e) => setStock(+e.target.value)} type="number" className="w-full py-2 px-4 outline-none rounded-lg bg-white" placeholder="Stock del producto" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Costo Unitario <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <input value={price} onChange={(e) => setPrice(+e.target.value)} type="number" className="w-full py-2 px-4 outline-none rounded-lg bg-white" placeholder="Marca del producto" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Marca <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <select className="w-full py-2 px-4 outline-none rounded-lg" value={selectedBrand} onChange={handleSelectChange}>
                <option value="">Selecciona una Marca</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Categoria <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1">
              <select className="w-full py-2 px-4 outline-none rounded-lg" value={selectedCategories} onChange={handleSelectChangeCat}>
                <option value="">Selecciona una Categoria</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr className="my-8 border-gray-500/30" />
          <div className="flex justify-end">
            <button type="submit" className="w-[150px]  font-poppins bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors">
            Agregar
            </button>
          </div>
        </form>
      }
    </div>
  );
};

export default AgregarProducto;
