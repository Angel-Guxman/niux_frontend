import React from 'react';
import Select from './Select'; // Asumiendo que Select está en el mismo directorio

function DynamicSelect({ label, options, size }) {
  return (
    <div>
      <Select label={label} options={options} size={size}/>
    </div>
  );
}

export default DynamicSelect;
