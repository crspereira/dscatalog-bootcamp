//constantes
export const CLIENT_ID = 'dscatalog';
export const CLIENT_SECRECT = 'dscatalog123';

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
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