import React from 'react';
import { ReactComponent as AuthImage } from 'core/assets/images/auth-image.svg';
import './styles.scss';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Recover from './components/Recover';

const Auth = () => {
   return (
      <div className="auth-container">
         <div className="auth-info">
            <h1 className="auth-info-title">
               Divulgue seus produtos
               <br/> no DSCatalog
            </h1>
            <p className="auth-info-subtitle">
               Faça parte do nosso catálogo de divulgação e
               <br/> aumente a venda dos seus produtos.
            </p>
            <AuthImage />
         </div>
         <div className="auth-content">
            <Switch>
               <Route path="/admin/auth/login">
                  <Login />
               </Route>
               <Route path="/admin/auth/register">
                  <Register />
               </Route>
               <Route path="/admin/auth/recover">
                  <Recover />
               </Route>
            </Switch>
         </div>
      </div>

   );
}

export default Auth;
