import React from 'react';
import { RiNotification3Line, RiArrowDownSLine, RiSettings3Line, RiLogoutCircleRLine, RiThumbUpLine, RiChat3Line } from 'react-icons/ri';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Link, Navigate } from 'react-router-dom';

import { useMsal } from '@azure/msal-react';
import { useAuthStore } from '../../stores/Auth/authStore';

const Header_Dash = () => {
  const user = useAuthStore((state) => state.user?.fullName || 'No user');
  const picture = useAuthStore((state) => state.user?.picture || 'No picture');
  const email = useAuthStore((state) => state.user?.email || 'No email');

  const authStatus = useAuthStore((state) => state.status);
  const checkAuth = useAuthStore((state) => state.checkAuthStatus);
  if (authStatus === 'pending') {
    checkAuth();
    return <div>Loading...</div>;
  }

  if (authStatus === 'unauthorized') {
    return <Navigate to="/login" />;
  }

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

  return (
    <header className="bg-neutral-200 h-[7vh] md:h-[10vh] border-b border-gray-100 p-8 flex items-center justify-end">
      <nav className="flex items-center gap-2">
        <Menu
          className="hover:text-white transition-colors"
          menuButton={
            <MenuButton className="text-gray-900 hover:text-white relative hover:bg-gray-500  p-2 rounded-lg transition-colors">
              <RiNotification3Line className="" />
              <span className="absolute -top-0.5 right-0 bg-purple-200 py-0.5 px-[5px] box-content text-gray-900  rounded-full text-[8px] font-bold">2</span>
            </MenuButton>
          }
          align="end"
          arrow
          transition
          arrowClassName="bg-secondary-100"
          menuClassName="bg-secondary-100 p-4"
        >
          <h1 className="text-gray-400 text-center font-medium">Notificaciones (2)</h1>
          <hr className="my-6 border-gray-500" />
          <MenuItem className="p-0 hover:bg-transparent">
            <Link to="/" className="text-gray-300 flex flex-1 items-center gap-4 py-2 px-4 hover:bg-secondary-900 transition-colors rounded-lg">
              <img src={user.picture} className="w-8 h-8 object-cover rounded-full" />
              <div className=" text-sm flex flex-col">
                <div className="text-gray-400 flex items-center justify-between gap-4">
                  <span>Andres Garcia</span> <span className="text-[8px]">21/10/2022</span>
                </div>
                <p className="text-gray-500 text-xs">Lorem ipsum dolor sit amet...</p>
              </div>
            </Link>
          </MenuItem>
          <MenuItem className="p-0 hover:bg-transparent">
            <Link to="/" className="text-gray-400 flex flex-1 items-center gap-4 py-2 px-4 hover:bg-secondary-900 transition-colors rounded-lg">
              <RiThumbUpLine className="p-2 bg-blue-200 text-blue-700 box-content rounded-full" />
              <div className="text-sm flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span>Nuevo like</span> <span className="text-[8px]">21/10/2022</span>
                </div>
                <p className="text-gray-500 text-xs">A Andres Garcia le gusta tu pub...</p>
              </div>
            </Link>
          </MenuItem>
          <MenuItem className="p-0 hover:bg-transparent">
            <Link to="/" className="text-gray-400 flex flex-1 items-center gap-4 py-2 px-4 hover:bg-secondary-900 transition-colors rounded-lg">
              <RiChat3Line className="p-2 bg-yellow-200 text-yellow-700 box-content rounded-full" />
              <div className="text-sm flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span>Nuevo comentario</span> <span className="text-[8px]">21/10/2022</span>
                </div>
                <p className="text-gray-500 text-xs">Jorge Trejo ha comentado tu...</p>
              </div>
            </Link>
          </MenuItem>
          <hr className="my-6 border-gray-500" />
          <MenuItem className="p-0 hover:bg-transparent flex justify-center cursor-default">
            <Link to="/" className="text-gray-400 text-sm hover:text-gray-900 transition-colors">
              Todas las notificaciones
            </Link>
          </MenuItem>
        </Menu>
        <Menu
          menuButton={
            <MenuButton className="text-gray-900 hover:text-white flex items-center gap-x-2 hover:bg-gray-500 p-2 rounded-lg transition-colors">
              <img src={picture} className="w-6 h-6 object-cover rounded-full" />
              <span>{user}</span>
              <RiArrowDownSLine />
            </MenuButton>
          }
          align="end"
          arrow
          arrowClassName="bg-secondary-100"
          transition
          menuClassName="bg-secondary-100 p-4"
        >
          <MenuItem className="p-0 hover:bg-transparent">
            <Link to="/perfil" className="rounded-lg transition-colors text-gray-400 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1">
              <img src={picture} className="w-8 h-8 object-cover rounded-full" />
              <div className="flex flex-col text-sm">
                <span className="text-sm">{user}</span>
                <span className="text-xs text-gray-500">{email}</span>
              </div>
            </Link>
          </MenuItem>
          <hr className="my-4 border-gray-500" />
          <MenuItem className="p-0 hover:bg-transparent">
            <Link to="/configuracion" className="rounded-lg transition-colors text-gray-500 hover:text-white hover:bg-purple-400 flex items-center gap-x-4 py-2 px-6 flex-1">
              <RiSettings3Line /> Configuración
            </Link>
          </MenuItem>
          <MenuItem className="p-0 hover:bg-transparent">
            <button onClick={instance.getActiveAccount() ? sessionMicrosoft : logoutSession} className="rounded-lg transition-colors text-gray-500 hover:text-white hover:bg-purple-400 flex items-center gap-x-4 py-2 px-6 flex-1">
              <RiLogoutCircleRLine /> Cerrar sesión
            </button>
            {/* <Link to="/cerrar-sesion" className="rounded-lg transition-colors text-gray-500 hover:text-white hover:bg-purple-400 flex items-center gap-x-4 py-2 px-6 flex-1">
            </Link> */}
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};

export default Header_Dash;
