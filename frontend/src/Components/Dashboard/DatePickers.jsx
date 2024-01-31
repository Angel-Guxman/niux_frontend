import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

const DatePickers = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log('newValue:', newValue);
    setValue(newValue);
  };

  return <Datepicker primaryColor={'violet'} value={value} onChange={handleValueChange} showShortcuts={true} />;
};
export default DatePickers;
