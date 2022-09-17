import {sendGet, sendPost, sendPatch, sendDelete} from './axios';
import {ENDPOINT} from "../config/endpoint";

export const getCustomerCare = (payload) => sendGet(ENDPOINT.customerCare, payload)
export const addCustomerCare = (payload) => sendPost(ENDPOINT.customerCare, payload)
export const patchCustomerCare = (payload) => sendPatch(ENDPOINT.customerCare, payload)
export const deleteCustomerCare = (payload) => sendDelete(ENDPOINT.customerCare, payload)