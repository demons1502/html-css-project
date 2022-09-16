import {sendGet} from './axios';
import {ENDPOINT} from "../config/endpoint";

export const getCustomer = (payload) => sendGet(ENDPOINT.customers.get, payload)
