import ModalDetailsOrder from '../Components/Orders/ModalDetailsOrder';
import { OrderService } from '../services/orderService';
import { productService } from '../services/productService';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';

const OrderUser = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await OrderService.getOrdersUser();
      setOrders(res);
    };
    fetchOrders();
  }, []);

  console.log(orders);

  const statusMappings = {
    pending: { translation: 'Pendiente', colorClass: 'text-yellow-700 bg-yellow-100' },
    completed: { translation: 'Completado', colorClass: 'text-green-700 bg-green-100' },
    cancelled: { translation: 'Cancelado', colorClass: 'text-red-700 bg-red-100' },
    refunded: { translation: 'Reembolsado', colorClass: 'text-purple-700 bg-purple-100' },
    failed: { translation: 'Fallido', colorClass: 'text-red-700 bg-red-100' },
    processing: { translation: 'Procesando', colorClass: 'text-blue-700 bg-blue-100' },
  };

  function getStatusColorClass(status) {
    return statusMappings[status] ? statusMappings[status].colorClass : 'text-gray-700 bg-gray-100';
  }

  function translateStatus(status) {
    return statusMappings[status] ? statusMappings[status].translation : 'Desconocido';
  }

  return (
    <div className="min-h-screen bg-gray-200 ">
      <Navbar />
      <div className="py-8 w-full">
        {}
        {orders.map((order) => (
          <div className="lg:flex items-center justify-center w-full mt-2">
            <div className="lg:w-10/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded">
              <div className="flex items-center border-b border-gray-200 pb-6">
                <img src={productService.getImages(order.orderProducts[0].product.images[0].url)} alt className="w-12 h-12 rounded-full" />
                <div className="flex items-start justify-between w-full">
                  <div className="pl-3 w-full">
                    <p className="text-xl font-medium leading-5 text-gray-800">
                      {order.orderProducts
                        .map((orderProduct, index) => (index > 0 ? ', ' + orderProduct.product.title : orderProduct.product.title))
                        .join('')
                        .slice(0, 50)}
                      {order.orderProducts.length > 1 ? '...' : ''}
                    </p>
                    <p className="text-sm leading-normal pt-2 text-gray-500">Cantidad de productos en total: {order.orderProducts.reduce((totalQuantity, orderProduct) => totalQuantity + orderProduct.quantity, 0)}</p>
                  </div>

                  {<ModalDetailsOrder props={order.orderProducts} />}
                </div>
              </div>
              <div className="px-2">
                <div className="flex">
                  <p className="text-md leading-5 py-4 text-gray-600">
                    <strong>Total pagado:</strong> ${order.total}
                  </p>
                  <p className="ml-3 text-md leading-5 py-4 text-gray-600">
                    <strong>Dirección de envío:</strong> 180 North King Street, Northhampton MA 1060
                  </p>
                </div>

                <div className="flex">
                  <div className={`rounded-full py-2 px-4 ml-3 text-xs leading-3 ${getStatusColorClass(order.status)}`}>{translateStatus(order.status)}</div>
                  <div className="py-2 px-4 ml-3 text-xs leading-3 text-gray-700 rounded-full bg-gray-100">{new Date(order.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
            {}
          </div>
        ))}
        {}
      </div>
    </div>
  );
};
export default OrderUser;
