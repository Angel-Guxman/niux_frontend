import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { OrderService } from '../../../services/orderService';
import { useOrderSearch } from '../../../stores//Order/orderStore';

const Filtro_Tickets = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const setOrderSearch = useOrderSearch((state) => state.setOrderSearch);

  const handleSearch = (e) => {
    setValueSearch(e.target.value);
  };

  const filterSearch = async () => {
    const Orders = await OrderService.getAllOrders();
    const filteredOrders = Orders.filter((order) => {
      const lowerCaseUserName = order.user.fullName.toLowerCase();
      const orderIdString = order.id.toString();
      const lowercaseSearch = valueSearch.split(' ').join('').toLowerCase();
      const separatedSearch = lowercaseSearch.split('');

      const userMatch = separatedSearch.every((letter) => lowerCaseUserName.includes(letter));
      const orderIdMatch = separatedSearch.every((letter) => orderIdString.includes(letter));

      return userMatch || orderIdMatch;
    });

    setOrderSearch(filteredOrders);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      filterSearch();
    }
  };

  return (
    <div>
      <div className="relative flex">
        <div className="relative w-full">
          <div className="mb-3">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <input
                onChange={handleSearch}
                onKeyPress={handleKeyPress}
                value={valueSearch}
                type="search"
                className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary h-10"
                placeholder="Buscar..."
                aria-label="Buscar..."
                aria-describedby="button-addon3"
              />

              <button onClick={filterSearch} className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-purple-300 bg-purple-300  hover:bg-opacity-5 focus:outline-none focus:ring-0 text-purple-800 border-purple-300 " type="button" id="button-addon3" data-te-ripple-init>
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
        <div id="dropdown" className={`absolute left-0 top-10 transition-all transform mt-2 z-20 ${isDropdownOpen ? 'animate__animated animate__fadeIn' : 'hidden'} bg-gray-900 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}></div>
      </div>
    </div>
  );
};

export default Filtro_Tickets;
