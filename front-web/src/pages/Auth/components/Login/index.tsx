//import userEvent from '@testing-library/user-event';
import ButtonIcon from 'core/components/ButtonIcon';
import { saveSessionData } from 'core/utils/auth';
import { makeLogin } from 'core/utils/request';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

//modelo de dados a ser enviado pelo ReactHookForm
type FormState = {
   username: string;
   password: string;
}

type LocationState = {
   from: string;
}

const Login = () => {
   //iniciando o ReactHook Form
   const { register, handleSubmit, errors } = useForm<FormState>();
   //inicia captura de erros
   const [hasError, setHasError] = useState(false);
   //redireciona
   const history = useHistory();
   //possibilita o armazenamento do estado de onde o usuário queria ir
   const location = useLocation<LocationState>();
   const { from } = location.state || { from: { pathname: "/admin" }};

   const onSubmit = (data: FormState) => { //variável data pode ser qualquer nome
      //console.log(data);
      makeLogin(data) // chamar API de autenticação
         .then( response => {
            setHasError(false)
            saveSessionData(response.data);
            history.replace(from) //"push" emplinha as rotas e "replace" sobrescreve
         })
         .catch(() => {
            setHasError(true);
         })
   }
   
   return (
      <div className="login-container" >
         <AuthCard title="Login">
            {/* Valida Login */}
            {hasError && (
               <div className="alert alert-danger mt-5" >
               Usuário ou Senha inválido!
               </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
               <div className="margin-botton-30">
                  <input
                     type="email" //type é do html5
                     className={`form-control input-base ${errors.username ? 'is-invalid': ''}`} //form-control é do bootstrap
                     placeholder="Email"
                     //integração com o ReactHook Form
                     name="username"
                     //ref={register({ required: true })}
                     ref={register({ //padrao ReactHook Form
                        required: "Campo obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido!" 
                        }
                      })}
                  />
                  {errors.username && (
                     <div className="invalid-feedback d-block">
                        {errors.username.message}
                     </div>
                  )}
               </div>
               <div className="margin-button-20">
                  <input
                     type="password" //type é do html5
                     className={`form-control input-base ${errors.username ? 'is-invalid': ''}`} //form-control é do bootstrap
                     placeholder="Senha"
                     //integração com o ReactHook Form
                     name="password"
                     //ref={register({ required: true })}
                     ref={register({ //padrao ReactHook Form
                        required: "Campo obrigatório", 
                      })}
                  />
                  {errors.password && (
                     <div className="invalid-feedback d-block">
                        {errors.password.message}
                     </div>
                  )}
               </div>
               <Link to="/auth/recover" className="login-link-recover" >
                  Esqueci a senha?
               </Link>
               <div className="login-submit">
                  <ButtonIcon textButton="Logar" />
               </div>
               <div className="not-registered-content">
                  <span className="not-registered-content-text">
                     Não tem Cadastro?
                  </span>
                  <Link to="/auth/register" className="not-registered-link-register" >
                     Cadastrar
                  </Link>
               </div>

            </form>
         </AuthCard>
      </div>
   );
}

export default Login;