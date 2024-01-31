import React, { useState } from 'react';
import Modal from '../../Dashboard/Modal';
import TablaDetallePedido from '../Pedidos/TablaDetallePedido';

function ModalDetallesPedido({ props }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <span onClick={openModal} className="cursor-pointer font-medium text-purple-600 dark:text-blue-500 hover:underline">
        Ver detalle
      </span>
      <Modal title={"Detalle del pedido: "+props.id+""} button="Cerrar" isOpen={isModalOpen} setIsOpen={setModalOpen}>
        <TablaDetallePedido props={props} />
      </Modal>
    </>
  );
}
export default ModalDetallesPedido;
