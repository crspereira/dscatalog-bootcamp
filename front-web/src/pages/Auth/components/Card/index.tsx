import React from 'react';
import './styles.scss';

type Props = {
   title: string;
   children: React.ReactNode; //para a construção dos difrentes formulários
}

const  AuthCard= ({ title, children }: Props) => {
   return (
      <div className="auth-card-container card-base" >
         <h1 className="auth-card-title">
          { title }
         </h1>
         { children }
      </div>
   );
}

export default AuthCard;