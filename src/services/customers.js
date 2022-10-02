import {sendGet, sendPatch} from './axios';
import {ENDPOINT} from "../config/endpoint";

export const updateCustomer = (id, payload) => sendPatch(`${ENDPOINT.customers}/${id}`, payload);
export const getCustomers = (payload) => sendGet(ENDPOINT.customersContracts, payload)
export const patchCustomer = (id, payload) => sendPatch(`${ENDPOINT.customers}/${id}`, payload)
