import axios,{ RawAxiosRequestHeaders } from "axios";

const axiosInstance = axios.create({});
export default function apiConnect(method:string,url:string,data?:{} | null,headers?:RawAxiosRequestHeaders,params?:string){
    return axiosInstance({
        method:method,
        url:url,
        data:data,
        headers:headers,
        params:params
    })
}
