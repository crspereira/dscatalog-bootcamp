import React from 'react';
import { isAllowedByRole, isAuthenticated, Role } from 'core/utils/auth';
import { Redirect, Route } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  path: string;
  allowedRoutes?: Role[];
}

const PrivateRoute = ({ children, path, allowedRoutes }: Props) => {

  return (
    <Route
      path={path}
      render={({ location }) => {
        if (!isAuthenticated()) {
          return (
            <Redirect
              to={{
                pathname: "/admin/auth/login",
                state: { from: location } //armazenamento do estado de onde o usuário queria ir
              }}
            />
          )
        } else if (isAuthenticated() && !isAllowedByRole(allowedRoutes)) { //checa se usuário tem ou não permissão de ver a rota
          return (
            <Redirect to={{ pathname: "/admin" }} />
          )
        }
        return children; //no caso o <Admin />
      }}
    />
  );
}

export default PrivateRoute;