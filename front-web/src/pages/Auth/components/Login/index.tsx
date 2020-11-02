import ButtonIcon from 'core/components/ButtonIcon';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

const Login = () => {
   return (
      <div className="login-container" >
         <AuthCard title="Login">
            <form action="" className="login-form">
               <input 
                  type="email"
                  className="form-control input-base margin-button-30" //form-control é do bootstrap
                  placeholder="Email"
               />
               <input 
                  type="password"
                  className="form-control input-base" //form-control é do bootstrap
                  placeholder="Senha"
               />
               <Link to="/admin/auth/recover" className="login-link-recover" >
                  Esqueci a senha?
               </Link>
               <div className="login-submit">
                  <Link to="/admin/products/create" className="login-link-recover" >
                     <ButtonIcon textButton="Logar"/>
                  </Link>
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