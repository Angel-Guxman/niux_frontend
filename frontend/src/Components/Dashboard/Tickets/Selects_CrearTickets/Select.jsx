import React, { useState, useRef } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

function Select({ label, options, size }) {
  const [showTickets, setShowTickets] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef(null);

  const handleInputClick = () => {
    setShowOptions(!showOptions);
    setShowTickets(!showTickets);
  };

  const handleOptionSelect = (e) => {
    setSelectedOption(e.target.value);
    setShowOptions(false);
    setShowTickets(true);
  };

  return (
    <div className="flex flex-col font-poppins pr-2 m-5 relative">
      <label htmlFor="tipo" className="mb-5 text-lg">{label}</label>
      <div className="relative border">
        <input
          ref={inputRef}
          type="text"
          className="p-2 w-full pl-8  border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
          placeholder={`Selecciona ${label}`}
          value={selectedOption}
          onClick={handleInputClick}
        />
        <RiArrowRightSLine 
          onClick={handleInputClick} // Esta línea es la adición clave
          className={`absolute top-3 left-2 cursor-pointer transition-transform transform ${showTickets ? '' : 'rotate-90'}`}
        />
      </div>
      {showOptions && (
        <select 
          className="border select-none border-purple-600 p-2 w-auto text-gray-900  " 
          size={size}
          value={selectedOption}
          onBlur={handleOptionSelect}
          onChange={handleOptionSelect}
        >
          {options.map((option) => (
           <option className='truncate bg-white hover:text-white hover:bg-purple-500 ' key={option} value={option} title={option}>
           {option}
       </option>
       
          ))}
        </select>
      )}
    </div>
  );
}

export default Select;
