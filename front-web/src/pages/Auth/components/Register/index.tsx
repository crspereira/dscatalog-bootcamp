import React from 'react';
import AuthCard from '../Card';
import './styles.scss';

const Register = () => {
   return (
      <div className="register-container card-base" >
         <AuthCard title="Cadastrar">
            <h1>Formulário</h1>
         </AuthCard>
      </div>
   );
}

export default Register;