import { niuxApi } from '../api/niuxApi';

export class OrderService {
  static getOrdersUser = async () => {
    try {
      const { data } = await niuxApi.get('/orders/user-orders');

      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  static getAllOrders = async () => {
    try {
      const { data } = await niuxApi.get('/orders');

      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  static editOrder = async (order, body) => {
    try {
      const { data } = await niuxApi.patch(`/orders/${order}`, body);

      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  static createOrder = async (order) => {
    try {
      const { data } = await niuxApi.post('/orders', order);

      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  static getRecentOrderUser = async () => {
    try {
      const { data } = await niuxApi.get('/orders/recent-order');

      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
}
