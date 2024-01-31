import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Icons
import { MdMiscellaneousServices, MdDashboard, MdOutlineLogout, MdOutlineMenu, MdOutlineClose } from 'react-icons/md';
import { AiFillCreditCard, AiOutlineUserSwitch, AiFillShop } from 'react-icons/ai';
import { RiBarChart2Line, RiTicketLine, RiEarthLine, RiCustomerService2Line, RiCalendarTodoLine, RiLogoutCircleRLine, RiArrowRightSLine, RiMenu3Line, RiCloseLine, RiAddCircleLine } from 'react-icons/ri';
import { useAuthStore } from '../../stores/Auth/authStore';
import { useMsal } from '@azure/msal-react';

const Sidebar_Dash = () => {
  
  const logout = useAuthStore((state) => state.logout);

  const { instance } = useMsal();
  const sessionMicrosoft = async () => {
    logout();
    await instance.logout({
      postLogoutRedirectUri: '/login',
    });
  };

  const logoutSession = () => {
    logout();
  };

  const [showMenu, setShowMenu] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <>
      <div className={`xl:h-[100vh] overflow-y-scroll fixed xl:static sm:w-[30%] md:w-[30%] lg:w-[20%] xl:w-auto h-full top-0 bg-white p-4 flex flex-col justify-between z-50 ${showMenu ? 'left-0' : '-left-full'} transition-all`}>
        <div>
          <div className=" flex items-center  p-8">
            <img className="w-[50px] " src="/Images/logo2niux.png" alt="" />
            <h1 className="uppercase font-bold">NIUX</h1>
          </div>
          <ul>
            <li>
              <Link to="/dashboard" className="flex items-center gap-4 py-2 px-4 rounded-lg hover:text-white hover:bg-purple-400 transition-colors font-poppinsd">
                <RiBarChart2Line /> Dashboard
              </Link>
            </li>
            <li>
              <button onClick={() => setShowSubmenu(!showSubmenu)} className="w-full flex items-center justify-between py-2 px-4 rounded-lg  hover:text-white hover:bg-purple-400 transition-colors font-poppins">
                <span className="flex items-center gap-4">
                  <RiCustomerService2Line /> Soporte
                </span>
                <RiArrowRightSLine className={`mt-1 ${showSubmenu && 'rotate-90'} transition-all`} />
              </button>
              <ul className={` ${showSubmenu ? 'h-[130px]' : 'h-0'} overflow-y-hidden transition-all`}>
                <li>
                  <Link to="/dashboard/tickets" className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-purple-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white hover:bg-purple-400 rounded-e-xl transition-colors">
                    <div className="flex items-center">
                      <RiTicketLine className="m-2" />
                      Tickets
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/add-ticket" className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-purple-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white hover:bg-purple-400 rounded-e-xl transition-colors">
                    <div className="flex items-center">
                      <RiAddCircleLine className="m-2" />
                      Crear
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-purple-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white hover:bg-purple-400 rounded-e-xl transition-colors">
                    Estadisticas
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/dashboard/orders" className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-purple-400 hover:text-white transition-colors">
                <AiFillCreditCard /> Pedidos
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users" className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-purple-400 hover:text-white transition-colors">
                <AiOutlineUserSwitch /> Usuarios
              </Link>
            </li>
            <li>
              <Link to="/dashboard/products" className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-purple-400 hover:text-white transition-colors">
                <AiFillShop /> Productos
              </Link>
            </li>
            <li>
              <Link to="/dashboard/services" className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-purple-400 hover:text-white transition-colors">
                <MdMiscellaneousServices /> Servicios
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <button onClick={instance.getActiveAccount() ? sessionMicrosoft : logoutSession} className="flex items-center gap-4 py-2 px-4 rounded-lg  hover:bg-purple-400 hover:text-white transition-colors">
            <RiLogoutCircleRLine className="text-primary" /> Cerrar sesión
          </button>
        </nav>
      </div>
      <button onClick={() => setShowMenu(!showMenu)} className="xl:hidden fixed bottom-4 right-4 bg-gray-900 text-white p-3 rounded-full z-50">
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  );
};

export default Sidebar_Dash;
