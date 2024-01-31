import React, { useState } from 'react';
import Editar_Ticket from '../Components/Dashboard/Tickets/Editar_Ticket';
import FormTickets from '../Components/Dashboard/Tickets/FormTickets';

const CrearTicket_Dash = () => {
  return (
    <div className="bg-white rounded-md shadow-md mb-5 px-4 py-8 md:items-start md:justify-start grid grid-cols-1 lg:grid-cols-3 gap-5">
  
    <div className='border border-green-800 rounded-md sm:col-span-1 lg:order-2'>
      <div className=''>
      <FormTickets />
      </div>
    </div>
    <div className="sm:col-span-2 lg:order-1">
      <Editar_Ticket />
    </div>

</div>
  );
};

export default CrearTicket_Dash;
