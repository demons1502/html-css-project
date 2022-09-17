import {sendGet, sendPost, sendPatch, sendDelete} from './axios';
import {ENDPOINT} from "../config/endpoint";

export const getCustomerCare = (payload) => sendGet(ENDPOINT.customerCare.get, payload)
export const addCustomerCare = (payload) => sendPost(ENDPOINT.customerCare.post, payload)
export const patchCustomerCare = (id) => sendPatch(ENDPOINT.customerCare.patch)
export const deleteCustomerCare = (id, payload) => sendDelete(ENDPOINT.customerCare.delete, payload)