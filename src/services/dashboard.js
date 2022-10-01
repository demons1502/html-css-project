import { sendGet, sendPatch } from './axios';

export const getMissedAppointmentApi = (data) => sendGet('/appointments', data);

export const getAppointmentScheduleApi = (data) => sendGet('/appointments', data);
export const updateAppointmentScheduleApi = (data) => sendPatch(`appointments/${data.apptId}`, data);

export const getTopPotentialCustomerApi = (data) => sendGet('/customers', data);
