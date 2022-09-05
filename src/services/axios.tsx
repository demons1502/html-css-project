import Axios from 'axios'
// import Cookies from 'js-cookie'
import configs from '../config'

const axiosInstance = Axios.create({
    timeout: 3 * 60 * 1000,
    baseURL: configs.API_DOMAIN,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
})

axiosInstance.interceptors.request.use(
    (config: any) => {
        // eslint-disable-next-line no-param-reassign
        // const token = Cookies.get('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        // return config;
    },
    (error: any) => Promise.resolve(error)
)

const logout = () => {
    // Cookies.remove('token');
    localStorage.clear()
}

axiosInstance.interceptors.response.use(
    (response: any) =>{
        return response
    },
    (error: any) => {        
        return Promise.reject(error)
    }
)

export const sendGet = (url: string, params?: any) => axiosInstance.get(url, {params}).then((res: any) => res.data)
export const sendPost = (url: string, params?: any, payloadGet?:any, header?: any) => axiosInstance.post(url, params, {params: payloadGet, headers: header}).then((res) => res)
export const sendPut = (url: string, params?: any) => axiosInstance.put(url, params).then((res: any) => res)
export const sendPatch = (url: string, params?: any) => axiosInstance.patch(url, params).then((res: any) => res.data)
export const sendDelete = (url: string, params?: any) => axiosInstance.delete(url, {params}).then((res: any) => res.data)
