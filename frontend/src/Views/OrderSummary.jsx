import React, { useEffect, useState } from 'react';
import { OrderService } from '../services/orderService';
import { productService } from '../services/productService';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [ordersProducts, setOrdersProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getRecentOrderUser();
        setOrders(response);
        setOrdersProducts(response.orderProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="2xl:container 2xl:mx-auto py-14 px-4 md:px-6 xl:px-20">
      <div className="flex flex-col xl:flex-row justify-center items-center space-y-10 xl:space-y-0 xl:space-x-8">
        <div className="w-full lg:w-9/12 xl:w-full">
          <img className="w-full hidden xl:block" src="/Images/payment_total.png" alt="wardrobe " />
          <img className="w-full hidden md:block xl:hidden" src="/Images/payment_total.png" alt="wardrobe " />
          <img className="w-full md:hidden" src="/Images/payment_total.png" alt="wardrobe " />
        </div>
        <div className="flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full ">
          <h3 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 w-full  md:text-left text-gray-800">¡Pago completado con éxito!</h3>
          {/* <p className="text-base leading-none mt-4 text-gray-800">
            Pagaste usando: <span className="font-semibold">Paypal</span>
          </p> */}
          <div className="flex justify-center items-center w-full mt-8  flex-col space-y-4 ">
            {}
            {ordersProducts.map((order) => (
              <div className="flex md:flex-row justify-start items-start md:items-center  border border-gray-200 w-full">
                <div className="w-40 md:w-32">
                  <img className="hidden md:block" src={productService.getImages(order.product.images[0].url)} alt="product-image-loading" />
                  <img className="md:hidden " src={productService.getImages(order.product.images[0].url)} alt="product-image-loading" />
                </div>
                <div className="flex justify-start md:justify-between items-start md:items-center  flex-col md:flex-row w-full p-4 md:px-8">
                  <div className="flex flex-col md:flex-shrink-0  justify-start items-start">
                    <h3 className="text-lg md:text-xl  w-full font-semibold leading-6 md:leading-5  text-gray-800">{order.product.title}</h3>
                    <div className="flex flex-row justify-start  space-x-4 md:space-x-6 items-start mt-4 ">
                      <p className="text-sm leading-none text-gray-600">
                        Marca: <span className="text-gray-800"> {order.product.brand.name.toUpperCase()}</span>
                      </p>
                      <p className="text-sm leading-none text-gray-600">
                        Cantidad: <span className="text-gray-800"> {order.quantity} </span>
                      </p>
                      <p className="text-sm leading-none text-gray-600">
                        Producto: <span className="text-gray-800"> ${order.product.price * order.quantity} </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-4 md:mt-0 md:justify-end items-center w-full ">{/* <p className="text-xl lg:text-1xl pt-8  font-semibold leading-5 lg:leading-6 text-gray-800">${order.product.price * order.quantity}</p> */}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-start items-start mt-8 xl:mt-10 space-y-10 w-full">
            <div className="flex justify-start items-start flex-col md:flex-row  w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8  lg:w-full">
              <div className="flex jusitfy-start items-start flex-col space-y-2"></div>
              <div className="flex jusitfy-start items-start flex-col space-y-2">
                <p className="text-base font-semibold leading-4  text-gray-800">Dirección de envío</p>
                <p className="text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p>
              </div>
              <div className="flex jusitfy-start items-start flex-col space-y-2">
                <p className="text-base font-semibold leading-4  text-gray-800">Método de envío</p>
                <p className="text-sm leading-5 text-gray-600">DHL - Puede tardar unos días</p>
              </div>
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base leading-4 text-gray-600">${orders.total}</p>
                </div>
                <div className="flex justify-between  w-full"></div>
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Precio de envío</p>
                  <p className="text-base leading-4 text-gray-600">$0.00</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                <p className="text-base font-semibold leading-4 text-gray-600">${orders.total}</p>
              </div>
              <div className="flex w-full justify-center items-center pt-1 md:pt-4  xl:pt-8 space-y-6 md:space-y-8 flex-col">
                <button onClick={() => navigate('/order_user')} className="py-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500  w-full text-base font-medium leading-4 text-white bg-purple-500 hover:bg-purple">
                  Ver todos tus pedidos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
