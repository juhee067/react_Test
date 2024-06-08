import { Cart } from '../models/cart.model';
import { httpClient } from './http';

interface AddCartParams {
  book_id: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  const response = await httpClient.post('/carts', params);
  return response.data;
};

export const fetch = async () => {
  const response = await httpClient.get<Cart[]>('/carts');
  return response.data;
};
