import axios, {Method} from 'axios';
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRECT } from './auth';

type RequestParams = {
   method?: Method;
   url: string;
   data?: object | string;
   params?: object;
   headers?: object;
}

type LoginData ={
   username: string;
   password: string;
}

//const BASE_URL = 'http://localhost:3000'; //config para o CORS
//"proxy": "http://localhost:8080", //config do package para o CORS
const BASE_URL = 'http://localhost:8080';

export const makeRequest = ({ method = 'GET', url, data, params, headers }: RequestParams) => {
   return axios ({
      method,
      url: `${BASE_URL}${url}`,
      data,
      params,
      headers
   });
}

//faz a requisão de login passando os parametros necessários
export const makeLogin = (loginData: LoginData) => {
   const token = `${CLIENT_ID}:${CLIENT_SECRECT}`;
   const headers = {
      Authorization: `Basic ${window.btoa(token)}`,
     'Content-Type': 'application/x-www-form-urlencoded'}

   const payload = qs.stringify({...loginData, grant_type: 'password' });
   //const payload = `username=${loginData.username}&password=${loginData.password}&grant_type=password`

   return (
      makeRequest({ url:'/oauth/token', data:payload, method:'POST', headers })
   );
}
