import { sendGet, sendPost } from './axios';
import { ENDPOINT } from '../config/endpoint';

export const getCustomerCallById = async (cId) => {
  const response = await sendGet(ENDPOINT.customerCall + '/' + cId);

  return response.data;
};

export const updateCustomerCallRecord = async (id) => {
  const response = await sendPost(ENDPOINT.customerCall + `/records/${id}`, {});

  return response.data;
};
