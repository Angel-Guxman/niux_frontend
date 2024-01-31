import React, { useState } from 'react';
import TemplateModal from '../../Dashboard/TemplateModal';
import FormEditarPedido from './FormEditarPedido';
import { OrderService } from '../../../services/orderService';

function ModalEditarPedido({ order, onReload }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const handleSave = async (updatedTotal, updateDate, state) => {
    await OrderService.editOrder(order.id, { total: +updatedTotal, createdAt: updateDate, status: state });
    setModalOpen(false);
    onReload();
  };

  return (
    <>
      <span onClick={openModal} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">
        Editar
      </span>
      <TemplateModal title={'Editar Pedido #' + order.id + ''} isOpen={isModalOpen} setIsOpen={setModalOpen}>
        <FormEditarPedido props={order} onSave={handleSave} />
      </TemplateModal>
    </>
  );
}
export default ModalEditarPedido;
