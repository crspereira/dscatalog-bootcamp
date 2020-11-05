import axios, {Method} from 'axios';
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRECT, getSessionData } from './auth';
import history from './history';

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

//intercepta a resposta do BackEnd
axios.interceptors.response.use(function(response) {
   //se sucesso ok
   //console.log('Resposta OK: ', response);
   return response;
}, function (error) { //captura qualquer erro fora do range 200
      if (error.response.status === 401) {
         //console.log('erro 401 capturado');
         history.push('/admin/auth/login'); //history costumizado com o <Router> no Routers.tsx e History.ts
      }

   return Promise.reject(error);
});

export const makeRequest = ({ method = 'GET', url, data, params, headers }: RequestParams) => {
   return axios ({
      method,
      url: `${BASE_URL}${url}`,
      data,
      params,
      headers
   });
}

//faz requisões de login em rotas que solicita de autorização
export const makePrivateRequest = ({ method = 'GET', url, data, params }: RequestParams) => {
   const sessionData = getSessionData();

   const headers = {
   'Authorization': `Bearer ${sessionData.access_token}`
   }

   return makeRequest({ method, url, data, params, headers })
}

//faz requisões de login passando os parametros necessários
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
