import { sendGet, sendPost, sendPatch } from './axios';
import { ENDPOINT } from '../config/endpoint';
import { creactAppointmentApi } from './appointment';

export const getCustomerCallById = async (cId) => {
  const response = await sendGet(ENDPOINT.customerCall + '/' + cId);

  return response.data;
};

export const updateCustomerCallRecord = async ({
  customerCallId,
  customerCallRecordId,
  isPotential,
  isCompleted
}) => {
  const response = await sendPatch(ENDPOINT.customerCall + `/${customerCallId}/records/current`, {
    customerCallRecordId,
    isPotential,
    isCompleted
  });

  return response.data;
};

export const getSpeechScript = async ({ type, customerId }) => {
  const queryObj = new URLSearchParams({ type, customerId })
  const response = await sendGet('speech-scripts?' + queryObj.toString());

  return response.data;
};

export const createCustomerCallRecord = async (customerCallId) => {
  const response = await sendPost(ENDPOINT.customerCall + `/records`, {
    customerCallId
  });

  return response.data;
};

export const createAutoApptAndCompleteCall = async (appointmentPayload, callRecordPayload, actionName) => {
  const apptResponse = await creactAppointmentApi(appointmentPayload);
  const callRecordResponse = await updateCustomerCallRecord(callRecordPayload);

  return { callRecordResponse, appointmentResponse: apptResponse?.data, action: actionName }
};
