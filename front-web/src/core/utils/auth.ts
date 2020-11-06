import JwtDecode from "jwt-decode";

//constantes
export const CLIENT_ID = 'dscatalog';
export const CLIENT_SECRECT = 'dscatalog123';

//tipos
type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
}

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

type AccessToken = {
    exp: number;
    username: string;
    authorities: Role[];
}


//salva os dados da sessão
export const saveSessionData = (loginResponse: LoginResponse ) => {
    localStorage.setItem('authData', JSON.stringify(loginResponse));
}

//recupera os dados da sessão
export const getSessionData = () => {
    const sessionData = localStorage.getItem('authData') ?? '{}'; //?? - se null/undefined executa um objeto vazio
    const parsedSessionData = JSON.parse(sessionData);

    //as: é um type casting - recurso do typescript. No caso transformando parseSessionData em LoginData
    return parsedSessionData as LoginResponse; 
}

//converte o token em json
export const getAcessTokenDecoded = () => {
    const sessionData = getSessionData();
    const tokenDecoder = JwtDecode(sessionData.access_token);

    //as: é um type casting - recurso do typescript. No caso transformando tokenDecoder em AccessToken
    return tokenDecoder as AccessToken;
}

//verifica se token esta expirado no localStorage do navegador
export const isTokenValid = () => {
    const { exp } = getAcessTokenDecoded(); //{ }: destructing retorna a propiedades do metodo atribuido

    if (Date.now() <= exp * 1000) {
        return true;
    }
    return false;
}

//checa se usuário esta de fato autenticado
export const isAuthenticated = () => {
    //verifica se possui 'authData' e 'access_token' no localStorage do navegador e não esta expirado
    const sessionData = getSessionData();
    return sessionData.access_token && isTokenValid();
}

//permissão em ROTAS por perfil de usuário vindos do BackEnd
export const isAllowedByRole = (routeRoles: Role[] = []) => {
    if (routeRoles.length === 0) {
        return true;
    }
    //destruction substitui ao metodo getAcessToken
    /*const userToken = getAcessTokenDecoded();
      const userRoles = userToken.authorities;
      return routeRoles.some(role => userRoles.includes(role));*/ 

    const { authorities } = getAcessTokenDecoded(); //{ }: destructing retorna a propiedades do metodo atribuido

    return routeRoles.some(role => authorities.includes(role));
}