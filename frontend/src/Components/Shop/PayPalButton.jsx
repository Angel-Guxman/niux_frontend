import React from 'react';

import { PayPalButtons } from '@paypal/react-paypal-js';
import { OrderService } from '../../services/orderService';
import { productService } from '../../services/productService';
import { useAuthStore } from '../../stores/Auth/authStore';

const PayPalButton = (props) => {
  const useUser = useAuthStore((state) => state.user);

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: props.invoice,
              amount: {
                value: props.total,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        await OrderService.createOrder(props.preOrder);
        await actions.order?.capture();
        await productService.deleteCartUser(useUser);

        props.preOrder.products.map(async (product) => {
          const getProduct = await productService.getProductById(product);

          const productIndex = props.preOrder.products.indexOf(product);

          const quantity = productIndex !== -1 ? props.preOrder.quantity[productIndex] : 0;

          const newStock = getProduct.stock - quantity;
          console.log(newStock);

          await productService.deleteStockProduct(product, newStock);
        });

        actions.redirect(import.meta.env.VITE_HOST + '/order_summary');
      }}
    ></PayPalButtons>
  );
};

export default PayPalButton;
