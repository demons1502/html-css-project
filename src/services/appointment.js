import { sendGet, sendPost } from './axios';

export const getAppointmentsApi = (payload) =>
  sendGet('/appointments', payload);

export const creactAppointmentApi = (payload) =>
  sendPost('/appointment', payload);
