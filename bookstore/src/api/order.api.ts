import { Order, OrderSheet } from '../models/order.model';
import { httpClient } from './http';

export const order = async (orderData: OrderSheet) => {
  try {
    const response = await httpClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Order failed:', error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await httpClient.get<Order[]>('/orders');
    return response.data;
  } catch (error) {
    console.error('Order failed:', error);
    throw error;
  }
};

export const fetchOrder = async (id: number) => {
  try {
    const response = await httpClient.get<Order[]>(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error('Order failed:', error);
    throw error;
  }
};