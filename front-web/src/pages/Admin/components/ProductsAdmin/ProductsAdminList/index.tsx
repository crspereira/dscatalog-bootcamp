import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Cards';
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
         <div className="admin-list-container">
            <Card />
            <Card />
            <Card />
         </div>
      </div>
   );
}

export default ProductsAdminList;