import { sendGet, sendPost } from './axios';
import { ENDPOINT } from '../config/endpoint';

export const getCustomerCallById = (cId) => {
  return sendGet(ENDPOINT + '/' + cId);
};

export const updateCustomerCallRecord = (id) => {
  return sendPost(ENDPOINT.customerCall + `/records/${id}`, {});
};
