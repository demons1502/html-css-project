import {sendGet, sendPost, sendPut, sendDelete} from './axios'
export const create = (payload?: any) => sendPost('api/create', payload)
export const getAll = (payload?: any) => sendGet('api/get-all', payload)
export const update = (id: number, payload?: any) => sendPut(`api/update/${id}`, payload)
export const remove = (id: number) => sendDelete(`api/remove/${id}`)