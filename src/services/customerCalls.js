import { sendGet, sendPost, sendPatch } from './axios';
import { ENDPOINT } from '../config/endpoint';

export const getCustomerCallById = async (cId) => {
  const response = await sendGet(ENDPOINT.customerCall + '/' + cId);

  return response.data;
};

export const updateCustomerCallRecord = async ({
  customerCallRecordId,
  isPotential,
  isCompleted
}) => {
  const response = await sendPatch(ENDPOINT.customerCall + `/${customerCallRecordId}/records/current`, {
    customerCallRecordId,
    isPotential,
    isCompleted
  });

  return response.data;
};

export const getSpeechScript = async (type) => {
  const response = await sendGet('speech-scripts?type=' + type);

  return response.data;
};

export const createCustomerCallRecord = async (customerCallId) => {
  const response = await sendPost(ENDPOINT.customerCall + `/records`, {
    customerCallId
  });

  return response.data;
}
