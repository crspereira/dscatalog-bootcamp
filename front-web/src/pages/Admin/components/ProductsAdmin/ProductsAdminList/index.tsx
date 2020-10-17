import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

const ProductsAdminList = () => {
   const history = useHistory();
   const handleCreate = () => {
      history.push('/admin/products/create')
   }

   return (
      <div className="admin-products-list">
         <button className="btn btn-primary btn-lg" onClick={handleCreate}>
            ADICIONAR
         </button>
         <h1>Product Listing Component</h1>
      </div>
   );
}

export default ProductsAdminList;