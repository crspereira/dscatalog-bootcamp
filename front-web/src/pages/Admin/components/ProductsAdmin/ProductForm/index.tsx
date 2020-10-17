import React from 'react';
import BaseFormAdmin from '../../BaseFormAdmin';
import './styles.scss';

const ProductForm = () => {
   return (
         <BaseFormAdmin title="Cadastrar um Produto">
            <div className="row">
               <div className="col-6">
                  <input type="text" className="form-control" />
               </div>
            </div>
         </BaseFormAdmin>
   );
}

export default ProductForm;