import { sendGet, sendPatch, sendPost } from './axios';
import request from './request';
// CallSchedule
export const getCallScheduleApi = (data) => sendGet('/customer-calls', data);
export const setNextCallApi = (data) => sendPatch(`/customer-calls/${data.id}`, data);
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
export const createCallTransferApi = async (data) =>
  request({
    url: 'customer-calls/bulk-create',
    method: 'post',
    data,
    enableFlashMessageSuccess: true,
    messageSuccess: 'Tạo cuộc gọi với khách hàng thành công!',
    messageError: 'Tạo cuộc gọi với khách hàng thất bại!',
  });
// SignedContract
export const getSignedContractApi = (data) => sendGet('/contracts/barchart', data);
// RatioContract
export const getRatioContractApi = (data) => sendGet('/contracts/piechart', data);
