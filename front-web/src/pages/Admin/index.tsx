import React from 'react';
import { Switch } from 'react-router-dom';
import NavbarAdmin from './components/Navbar';
import ProductsAdmin from './components/Products';
import PrivateRoute from 'core/components/Routs/PrivateRouter';
import './styles.scss'

const Admin = () => {
    return (
        <div className="admin-container">
            <NavbarAdmin />
            <div className="admin-content">
                <Switch>
                    <PrivateRoute path="/admin/products">
                        <ProductsAdmin />
                    </PrivateRoute>
                    <PrivateRoute path="/admin/categories">
                        <h1>Categories</h1>
                    </PrivateRoute>
                    <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                        <h1>Users</h1>
                    </PrivateRoute>                  
                </Switch>
            </div>
        </div>
        
    );
}

export default Admin;