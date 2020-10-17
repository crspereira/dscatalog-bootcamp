import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

type Props = {
   title: string;
   children: React.ReactNode;
}

const BaseFormAdmin = ({ title, children}: Props) => {
   const history = useHistory();
   const handleCancel = () => {
      history.push('../');
   }
   return (
      <div className="admin-base-form-container">
         <h1 className="admin-base-form-title">
            { title }
         </h1>

         {children}

         <div className="admin-base-form-actions">
            <button 
               className="btn btn-outline-danger border-radius-10 mr-3"
               onClick={handleCancel}
            >
               Cancelar
            </button>
            <button className="btn btn-primary border-radius-10">
               Cadastrar
            </button>
         </div>
      </div>
   );
}

export default BaseFormAdmin;