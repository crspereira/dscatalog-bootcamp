import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavbarAdmin from './components/NavbarAdmin';
import ProductsAdmin from './components/ProductsAdmin';
import './styles.scss'

const Admin = () => {
    return (
        <div className="admin-container">
            <NavbarAdmin />
            <div className="admin-content">
                <Switch>
                    <Route path="/admin/products">
                        <ProductsAdmin />
                    </Route>
                    <Route path="/admin/categories">
                        <h1>Categories</h1>
                    </Route>
                    <Route path="/admin/users">
                        <h1>Users</h1>
                    </Route>                  
                </Switch>
            </div>
        </div>
        
    );
}

export default Admin;