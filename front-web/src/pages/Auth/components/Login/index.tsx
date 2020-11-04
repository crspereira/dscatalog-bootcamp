import ButtonIcon from 'core/components/ButtonIcon';
import { makeLogin } from 'core/utils/request';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

//modelo de dados a ser enviado pelo ReactHookForm
type FormData = {
   username: string;
   password: string;
}

const Login = () => {
   //iniciando o ReactHook Form
   const { register, handleSubmit } = useForm<FormData>();
   const [hasError, setHasError] = useState(false);

   const onSubmit = (data: FormData) => { //variável data pode ser qualquer nome
      //console.log(data);
      makeLogin(data) // chamar API de autenticação
         .then( response => {
            setHasError(false);
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
               <input
                  type="email" //type é do html5
                  className="form-control input-base margin-button-30" //form-control é do bootstrap
                  placeholder="Email"
                  //integração com o ReactHook Form
                  name="username"
                  ref={register({ required: true })}
               />
               <input
                  type="password" //type é do html5
                  className="form-control input-base" //form-control é do bootstrap
                  placeholder="Senha"
                  //integração com o ReactHook Form
                  name="password"
                  ref={register({ required: true })}
               />
               <Link to="/admin/auth/recover" className="login-link-recover" >
                  Esqueci a senha?
               </Link>
               <div className="login-submit">
                  <ButtonIcon textButton="Logar" />
               </div>
               <div className="not-registered-content">
                  <span className="not-registered-content-text">
                     Não tem Cadastro?
                  </span>
                  <Link to="/admin/auth/register" className="not-registered-link-register" >
                     Cadastrar
                  </Link>
               </div>

            </form>
         </AuthCard>
      </div>
   );
}

export default Login;