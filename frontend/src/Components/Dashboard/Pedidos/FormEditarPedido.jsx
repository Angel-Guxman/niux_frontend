import React, { useState, useEffect } from 'react';

const FormEditarPedido = ({ props, onSave }) => {
  const [total, setTotal] = useState(props.total);
  const [fechaPedido, setFechaPedido] = useState(props.fechaPedido);
  const [estado, setEstadoPedido] = useState(props.estado.props.pedido);

  const handleTotalChange = (event) => {
    const nuevoValor = event.target.value.replace(/[^0-9]/g, '');
    setTotal(nuevoValor);
  };

  useEffect(() => {
    const dateObject = new Date(props.fechaPedido);
    const formattedDate = dateObject.toISOString().split('T')[0];
    setFechaPedido(formattedDate);
  }, [props.fechaPedido]);

  let estadoPedido = '';
  switch (props.estado.props.pedido) {
    case 'pending':
      estadoPedido = 'pendiente';
      break;

    case 'completed':
      estadoPedido = 'completado';
      break;

    case 'cancelled':
      estadoPedido = 'cancelado';
      break;

    case 'processing':
      estadoPedido = 'enProceso';
      break;

    default:
      break;
  }

  const mapaEstados = {
    completado: 'completed',
    pendiente: 'pending',
    enProceso: 'processing',
    cancelado: 'cancelled',
  };

  const handleEstadoChange = (event) => {
    const nuevoEstado = event.target.value;
    setEstadoPedido(mapaEstados[nuevoEstado]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(total, fechaPedido, estado);
  };

  return (
    <div className="w-full mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-4 items-center"></div>
        <div className="flex justify-between mb-4 items-center">
          <label className="text-lg font-bold font-poppins">ESTADO:</label>
          <select onChange={handleEstadoChange} defaultValue={estadoPedido} className="w-1/2 py-2 px-4 rounded-lg outline-purple-600 border-[2px] border-purple-400">
            <option className="hover:bg-purple-400 hover:text-white" value="completado">
              Completado
            </option>
            <option value="pendiente">Pendiente</option>
            <option value="enProceso">Procesando</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <div className="flex justify-between mb-4 items-center">
          <label className="text-lg font-bold font-poppins">TOTAL:</label>
          <input onChange={handleTotalChange} value={total} type="text" className="w-1/2 py-2 px-4 rounded-lg outline-purple-600 border-[2px] border-purple-400" placeholder="Total del pedido" />
        </div>
        <div className="flex justify-between mb-6 items-center">
          <label className="text-lg font-bold font-poppins">FECHA DE PEDIDO:</label>
          <input type="date" value={fechaPedido} onChange={(e) => setFechaPedido(e.target.value)} className="w-1/2 py-2 px-4 rounded-lg outline-purple-600 border-[2px] border-purple-400" />
        </div>
        <button type="submit" className="w-[150px]  font-poppins bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default FormEditarPedido;
