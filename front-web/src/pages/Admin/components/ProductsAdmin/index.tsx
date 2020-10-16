import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './styles.scss';

const ProductsAdmin = () => {
   return (
      <div>
         <Link to="/admin/products" className="mr-5">
            List
         </Link>
         <Link to="/admin/products/create" className="mr-5">
            Create
         </Link>
         <Link to="/admin/products/10" className="mr-5">
            Edit
         </Link>

         <Switch>
            <Route path="/admin/products" exact>
               <h1>Product Listing</h1>
            </Route>
            <Route path="/admin/products/create">
               <h1>Product Creating</h1>
            </Route>
            <Route path="/admin/products/:productId">
               <h1>ProductId Editing</h1>
            </Route>
         </Switch>
      </div>
   );
}

export default ProductsAdmin;