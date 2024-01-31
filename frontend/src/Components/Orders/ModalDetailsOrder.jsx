import React, { useState } from 'react';
import Modal from './ModalOrder';
import TableDetailsOrder from './TableDetailsOrder';
import { MdPageview } from 'react-icons/md';

function ModalDetailsOrder({ props }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <MdPageview size={40} onClick={openModal} className=" text-sm cursor-pointer font-medium text-indigo-400 dark:text-blue-500 hover:underline">
        Ver Productos
      </MdPageview>
      <Modal button="Cerrar" isOpen={isModalOpen} setIsOpen={setModalOpen}>
        <TableDetailsOrder products={props} />
      </Modal>
    </>
  );
}
export default ModalDetailsOrder;
