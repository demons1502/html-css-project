import { sendGet, sendPatch } from './axios';
import { ENDPOINT } from '../config/endpoint';

export const getCustomers = (payload) => sendGet(ENDPOINT.customers, payload);
export const getcustomersByCompany = (id, payload) => sendGet(`${ENDPOINT.customersByCompany}/${id}`, payload);
export const getCustomersContracts = (payload) => sendGet(ENDPOINT.customersContracts, payload);
export const updateCustomer = (id, payload) => sendPatch(`${ENDPOINT.customers}/${id}`, payload);
export const patchCustomer = (id, payload) => sendPatch(`${ENDPOINT.customers}/${id}`, payload);
export const getCustomerByIdAndType = (id, typeId, payload) => sendGet(`${ENDPOINT.customers}/${id}/${typeId}`, payload);
