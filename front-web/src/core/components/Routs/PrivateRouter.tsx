import React from 'react';
import { isAuthenticated } from 'core/utils/auth';
import { Redirect, Route } from 'react-router-dom';

type Props = {
   children: React.ReactNode;
   path: string;
}

const PrivateRoute = ({ children, path }: Props) => {
   
   return (
     <Route
       path={path}
       render={({ location }) =>
       isAuthenticated() ? ( //verifica se possui 'authData' e 'access_token' no localStorage do navegador
           children
         ) : (
           <Redirect
             to={{
               pathname: "/admin/auth/login",
               state: { from: location }
             }}
           />
         )
       }
     />
   );
 }

 export default PrivateRoute;