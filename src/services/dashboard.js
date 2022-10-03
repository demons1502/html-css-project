import { sendGet, sendPatch, sendPost } from './axios';
// CallSchedule
export const getCallScheduleApi = (data) => sendGet('/customer-calls', data);
// CustomerCareDashboard
export const getCustomerCareApi = (data) => sendGet('/customers/event', data);
export const getRemindFeeApi = (data) => sendGet('/contracts', data);
export const sendSMSApi = (data) => sendPost('/events/send', data);
export const sendEmailApi = (data) => sendPost('/events/send', data);
// MissedAppointment
export const getMissedAppointmentApi = (data) => sendGet('/appointments', data);
// AppointmentSchedule
export const getAppointmentScheduleApi = (data) => sendGet('/appointments', data);
export const updateAppointmentScheduleApi = (data) => sendPatch(`appointments/${data.apptId}`, data);
// TopPotentialCustomer
export const getTopPotentialCustomerApi = (data) => sendGet('/customers', data);
export const createCallTransferApi = (data) => sendPost('/customer-calls/bulk-create', data);
// SignedContract
export const getSignedContractApi = (data) => sendGet('/contracts/bar-chart', data);
// RatioContract
export const getRatioContractApi = (data) => sendGet('/contracts/pie-chart', data);
