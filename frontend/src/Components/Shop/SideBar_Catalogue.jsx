import React, { useEffect, useState } from 'react';
import { MdLaptop, MdMonitor, MdOutlineStorage } from 'react-icons/md';
import { BsCpu, BsGpuCard, BsHeadphones, BsKeyboard, BsMotherboard, BsMouse } from 'react-icons/bs';
import { FaComputer } from 'react-icons/fa6';
import { IoHeadsetSharp } from 'react-icons/io5';
import { AiFillStar } from 'react-icons/ai';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { niuxApi } from '../../api/niuxApi';
import { CgSmartphoneRam } from 'react-icons/cg';
import { FaGamepad } from 'react-icons/fa';
import { useSearchStore } from '../../stores/shop/searchStore';

const SideBar_Catalogue = () => {
  const setSearch = useSearchStore((state) => state.setSearch);

  const sectionIcons = {
    Destacados: <AiFillStar />,
    Componentes: <BsGpuCard />,
    Laptops: <MdLaptop />,
    Accesorios: <IoHeadsetSharp />,
    Software: <FaComputer />,
    Motherboard: <BsMotherboard />,
    'Tarjeta Gráfica': <BsGpuCard />,
    Procesadores: <BsCpu />,
    Ram: <CgSmartphoneRam />,
    Almacenamiento: <MdOutlineStorage />,
    Gaming: <FaGamepad />,
    Teclado: <BsKeyboard />,
    Ratón: <BsMouse />,
    Monitor: <MdMonitor />,
    Auriculares: <BsHeadphones />,
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await niuxApi.get('/categories');
      setCategories(response.data);
    };
    getCategories();
  }, []);

  const filters = categories.map((category) => ({
    id: category.id,
    name: category.name.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }),
  }));

  const handledButton = async (categoryId, categoryName) => {
    try {
      const response = await niuxApi.get(`/products/filter-category/${categoryId}`);
      setSearch(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="bg-white h-screen sticky top-0 z-40">
      <div className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-secondary-100 p-4 flex flex-col justify-between z-50 bg-white ${showMenu ? 'left-0' : '-left-full'} transition-all`}>
        <div>
          <div className=" flex items-center p-8">
            <h1 className="mt-2 text-center ml-[25px] text-gray-700 font-bold text-2xl">Categorías</h1>
          </div>
          <div className="">
            <h3 className="sr-only">Categories</h3>

            {filters.map((section) => (
              <h3 className="-my-3 flow-root">
                <button onClick={(e) => handledButton(section.id, section.name)} className={`relative w-[240px] mb-5 flex items-center gap-4 py-3 px-6 hover:bg-purple-400 hover:text-white transition-colors text-gray-600 font-bold text-lg border border-gray-300 rounded-2xl btn-lg `}>
                  {sectionIcons[section.name]}

                  {section.name}
                  <span className="absolute right-6 top-1/2 transdiv -translate-y-1/2"></span>
                </button>
              </h3>
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => setShowMenu(!showMenu)} className="xl:hidden fixed bottom-4 right-4 bg-primary text-gray-700 p-3 rounded-full z-50">
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </div>
  );
};

export default SideBar_Catalogue;
