import React, { useState, useRef } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

function FilterSelect({ options }) {
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
      <label htmlFor="tipo" className="mb-5 text-lg">Tipo</label>
      <div className="relative border">
        <input
          ref={inputRef}
          type="text"
          className="p-2 w-full pl-8 border border-gray-300 focus:border-purple-500"
          placeholder="Selecciona el Tipo"
          value={selectedOption}
          onClick={handleInputClick}
        />
        <RiArrowRightSLine className={`absolute top-3 left-2 transition-transform transform ${showTickets ? '' : 'rotate-90'}`} />
      </div>
      {showOptions && (
        <select 
          className="border border-purple-600 p-2 w-auto mt-2 text-gray-900" 
          size={2}
          value={selectedOption}
          onBlur={handleOptionSelect}
          onChange={handleOptionSelect}
        >
          {options.map((option) => (
            <option className='bg-white hover:text-white hover:bg-purple-500' key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default FilterSelect;
