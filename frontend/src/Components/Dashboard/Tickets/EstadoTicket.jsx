import React from 'react';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

const EstadoTicket = (props) => {
  const { ticket, text } = props;

  let status = '';
  let textColor = '';

  switch (ticket) {
    case 'espera':
      status = 'bg-yellow-500/40 text-yellow-600';
      textColor = 'text-yellow-500';
      break;
      case 'resuelto':
      status = 'bg-gray-700/50 text-gray-100';
      textColor = 'text-gray-500';
      break;
    case 'enProceso':
      status = 'bg-blue-500/40 text-blue-600';
      textColor = 'text-blue-500';
      break;
    case 'nuevo':
      status = 'bg-green-500/40 text-green-600';
      textColor = 'text-green-500';
      break;
    case 'cerrado':
      status = 'bg-pink-500/40 text-pink-500';
      textColor = 'text-pink-500';
      break;
  }

  return (
    <div className='' >
      {/* Estado del ticket*/}
        <p className={`${status} rounded-lg flex flex-col h-18 text-center`} >{text}</p>
      
    </div>
  );
};

export default EstadoTicket;
