import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { useSearchStore } from '../stores/shop/searchStore';
import { productService } from '../services/productService';
import { useAuthStore } from '../stores/Auth/authStore';
import { useNavigate } from 'react-router-dom';
import { TbTruckDelivery } from 'react-icons/tb';
import { useMsal } from '@azure/msal-react';

const navigation = [
  { name: 'Inicio', href: '/', current: false },
  { name: 'Tienda', href: '/catalogue', current: false },
  { name: 'Servicios', href: '/services', current: false },
  { name: 'Contacto', href: '/Contacto', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
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

  const setSearch = useSearchStore((state) => state.setSearch);
  const useUser = useAuthStore((state) => state.user);

  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handledButtonCart = () => {
    navigate('/cart');
  };

  const handledButtonOrder = () => {
    navigate('/order_user');
  };

  const handledButton = async (e) => {
    e.preventDefault();

    const products = await productService.getAll();

    const filteredProducts = products.filter((product) => {
      const lowercaseTitle = product.title.toLowerCase();
      const lowercaseBrandName = product.brand.name.toLowerCase();
      const lowercaseTags = product.tags.map((tag) => tag.toLowerCase());
      const lowercaseSearch = searchValue.split(' ').join('').toLowerCase();
      const separatedSearch = lowercaseSearch.split('');

      const titleMatch = separatedSearch.every((letter) => lowercaseTitle.includes(letter));
      const brandNameMatch = separatedSearch.every((letter) => lowercaseBrandName.includes(letter));
      const tagsMatch = separatedSearch.every((letter) => lowercaseTags.some((tag) => tag.includes(letter)));

      return titleMatch || brandNameMatch || tagsMatch;
    });

    setSearch(filteredProducts);
    navigate('/catalogue');
  };

  const authStatus = useAuthStore((state) => state.status);
  const checkAuth = useAuthStore((state) => state.checkAuthStatus);

  if (authStatus === 'unauthorized') {
    checkAuth();
    return (
      <Disclosure as="nav" className="bg-white sticky top-0 z-50  h-16 items-center justify-between ">
        {({ open }) => (
          <>
            <div className=" bg-white mx-auto sm:px-4 lg:px-5 sm:bg-white sm:w-full md:bg-white lg:bg-white xl:bg-white">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-purple-500 border-2  hover:bg-purple-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-400 ml-4">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center   ">
                  <div className="flex flex-shrink-0 items-center uppercase font-bold">
                    <img className="h-8 w-auto lg:ml-8" src="../../public/Images/logo2niux.png" alt="Your Company" />
                    <h2>Niux</h2>
                  </div>

                  <div className="sm:hidden hidden lg:ml-6 lg:block md:ml-0  md:hidden">
                    <div className="flex space-x-4 gap-4 ">
                      {navigation.map((item) => (
                        <a key={item.name} href={item.href} className={classNames(item.current ? 'bg-purple-400 text-white' : 'text-black hover:bg-purple-400 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300')} aria-current={item.current ? 'page' : undefined}>
                          {item.name}
                        </a>
                      ))}
                      <form>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                          Search
                        </label>
                        <div className="relative">
                          <button onClick={handledButton} className="absolute inset-y-0 right-4 flex items-center pl-3">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                          </button>
                          <input
                            type="search"
                            id="default-search"
                            className="focus:outline-purple-500 block w-80 h-9 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:focus:outline-purple-500 "
                            placeholder="Buscar en el catálogo..."
                            required=""
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                  {}
                  <button onClick={() => navigate('/register')} type="button" className="relative rounded-md bg-white-500 text-purple-500  border focus:outline-none focus:ring-2 focus:ring-white  focus:ring-offset-gray-800 px-2 py-2 text-base font-medium">
                    Registrarse
                  </button>
                  <button onClick={() => navigate('/login')} type="button" className="relative rounded-md bg-purple-500 text-white ml-2 focus:outline-none focus:ring-2 focus:ring-white  focus:ring-offset-gray-800 px-2 py-2 text-base font-medium">
                    Iniciar sesión
                  </button>
                  {}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:space-y-1 sm:px-2 sm:pb-3 sm:pt-2 bg-neutral-100 sm:absolute w-[400px] ">
                {navigation.map((item) => (
                  <Disclosure.Button key={item.name} as="a" href={item.href} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-600 bg-white border-gray-400 border ml-2 hover:bg-purple-400 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')} aria-current={item.current ? 'page' : undefined}>
                    {item.name}
                  </Disclosure.Button>
                ))}
                <form className=" flex justify-center">
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="focus:outline-puArple-500 block w-80 h-9 p-4 pl-10 text-sm text-gray-900 border border-gray-500 rounded-full bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:focus:outline-purple-500 "
                      placeholder="Buscar..."
                      required=""
                    />
                  </div>
                </form>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  } else {
    return (
      <Disclosure as="nav" className="bg-white sticky top-0 z-50  h-16 items-center justify-between ">
        {({ open }) => (
          <>
            <div className=" bg-white mx-auto sm:px-4 lg:px-5 sm:bg-white sm:w-full md:bg-white lg:bg-white xl:bg-white">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-purple-500 border-2  hover:bg-purple-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-400 ml-4">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center   ">
                  <div className="flex flex-shrink-0 items-center uppercase font-bold">
                    <img className="h-8 w-auto lg:ml-8" src="../../public/Images/logo2niux.png" alt="Your Company" />
                    <h2>Niux</h2>
                  </div>

                  <div className="sm:hidden hidden lg:ml-6 lg:block md:ml-0  md:hidden">
                    <div className="flex space-x-4 gap-4 ">
                      {navigation.map((item) => (
                        <a key={item.name} href={item.href} className={classNames(item.current ? 'bg-purple-400 text-white' : 'text-black hover:bg-purple-400 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300')} aria-current={item.current ? 'page' : undefined}>
                          {item.name}
                        </a>
                      ))}
                      <form>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                          Search
                        </label>
                        <div className="relative">
                          <button onClick={handledButton} className="absolute inset-y-0 right-4 flex items-center pl-3">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                          </button>
                          <input
                            type="search"
                            id="default-search"
                            className="focus:outline-purple-500 block w-80 h-9 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:focus:outline-purple-500 "
                            placeholder="Buscar en el catálogo..."
                            required=""
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                  <button onClick={handledButtonOrder} type="button" className="relative rounded-full bg-white p-1 text-gray-600 hover:text-white hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <TbTruckDelivery className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <button onClick={handledButtonCart} type="button" className="relative rounded-full bg-white p-1 text-black hover:text-white hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <HiOutlineShoppingCart className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white">
                        <span className="absolute -inset-1.5" />
                        <span className=" sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={useUser.picture} alt="" />
                      </Menu.Button>
                    </div>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a onClick={instance.getActiveAccount() ? sessionMicrosoft : logoutSession} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              Cerrar sesión
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:space-y-1 sm:px-2 sm:pb-3 sm:pt-2 bg-neutral-100 sm:absolute w-[400px] ">
                {navigation.map((item) => (
                  <Disclosure.Button key={item.name} as="a" href={item.href} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-600 bg-white border-gray-400 border ml-2 hover:bg-purple-400 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')} aria-current={item.current ? 'page' : undefined}>
                    {item.name}
                  </Disclosure.Button>
                ))}
                <form className=" flex justify-center">
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="focus:outline-puArple-500 block w-80 h-9 p-4 pl-10 text-sm text-gray-900 border border-gray-500 rounded-full bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:focus:outline-purple-500 "
                      placeholder="Buscar..."
                      required=""
                    />
                  </div>
                </form>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }
}
