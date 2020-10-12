import React from 'react';
import { ReactComponent as ProductImage } from '../../../../core/assets/images/product.svg';
import ProductPrice from '../ProductPrice';
import './styles.scss';


const ProductCard = () => {
   return (
      <div className="card-base product-card">
         <ProductImage />
         <div className="product-info">
            <h6 className="product-name">
               Computador Desktop - Intel Core i7
            </h6>
            <ProductPrice price="2.779,00"/>
         </div>
      </div>

   );
}

export default ProductCard;