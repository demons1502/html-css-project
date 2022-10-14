import { ENDPOINT } from '../config/endpoint';
import { sendGet, sendPatch, sendPost } from './axios';
import request from './request';
// CallSchedule
export const getCallScheduleApi = (data) => sendGet(`/${ENDPOINT.customerCall}`, data);
export const setNextCallApi = (data) => sendPatch(`/${ENDPOINT.customerCall}/${data.id}`, data);
export const setDoneCallApi = async (data) =>
  request({
    url: `${ENDPOINT.customerCall}/${data.customerCallId}`,
    method: 'patch',
    data,
    enableFlashMessageSuccess: true,
    messageSuccess: 'Hoàn thành cuộc gọi thành công',
    messageError: 'Hoàn thành cuộc gọi thất bại!',
  });
// CustomerCareDashboard
export const getCustomerCareApi = (data) => sendGet(`/${ENDPOINT.customers}/event`, data);
export const getRemindFeeApi = (data) => sendGet(`/${ENDPOINT.contracts}`, data);
export const sendSMSApi = async (data) =>
  request({
    url: `/${ENDPOINT.events}/send`,
    method: 'post',
    data,
    enableFlashMessageSuccess: true,
    messageSuccess: 'Gửi SMS thành công',
    messageError: 'Gửi SMS thất bại!',
  });
export const sendEmailApi = (data) => sendPost(`/${ENDPOINT.events}/send`, data);
// MissedAppointment
export const getMissedAppointmentApi = (data) => sendGet(`/${ENDPOINT.appointments}`, data);
export const setCustomerCareForItemAppointmentApi = (data) =>
  sendPatch(`/${ENDPOINT.customers}/${data.customerId}`, data);
// AppointmentSchedule
export const getAppointmentScheduleApi = (data) => sendGet(`/${ENDPOINT.appointments}`, data);
export const updateAppointmentScheduleApi = (data) => sendPatch(`${ENDPOINT.appointments}/${data.apptId}`, data);
// TopPotentialCustomer
export const getTopPotentialCustomerApi = (data) => sendGet(`${ENDPOINT.customers}`, data);
export const createCallTransferApi = async (data) =>
  request({
    url: `${ENDPOINT.customerCall}/bulk-create`,
    method: 'post',
    data,
    enableFlashMessageSuccess: true,
    messageSuccess: 'Tạo cuộc gọi với khách hàng thành công!',
    messageError: 'Tạo cuộc gọi với khách hàng thất bại!',
  });
// SignedContract
export const getSignedContractApi = (data) => sendGet(`/${ENDPOINT.contracts}/barchart`, data);
// RatioContract
export const getRatioContractApi = (data) => sendGet(`/${ENDPOINT.contracts}/piechart`, data);
