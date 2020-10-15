import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import { Product } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import ProductDescriptionLoader from '../Loaders/ProductDescriptionLoader';
import ProductInfoLoader from '../Loaders/ProductInfoLoader';
import ProductPrice from '../ProductPrice';
import './styles.scss';

type ParamsType = {
   productId: string;
}

const ProductDetails = () => {
   const { productId } = useParams<ParamsType>();
   const [isLoading, setIsLoading] = useState(false);

   //Passo1: carragar produto para popular estado
   useEffect(() => {
      //inica o loader
      setIsLoading(true);
      makeRequest({ url: `/products/${productId}` })
         .then(response => setProduct(response.data))
         //finaliza o loader
         .finally(() => {
            setIsLoading(false);
         })
   }, [productId])

   //Passo2: listar produto
   const [product, setProduct] = useState<Product>();

   return (
      <div className="product-details-container">
         <div className="product-details-content card-base">
            <Link to="/products" className="product-details-goBack">
               <ArrowIcon className="icon-goBack" />
               <h1 className="text-goBack">voltar</h1>
            </Link>
            <div className="row">
               <div className="col-6 pr-5">
                  {isLoading ? <ProductInfoLoader /> : (
                     <>
                        <div className="product-details-card text-center">
                           <img src={product?.imgUrl} alt={product?.name} className="product-details-image" />
                        </div>
                        <h1 className="product-details-name">
                           {product?.name}
                        </h1>
                        {/* condicional: <SE VERDADEIRO> &&(ENTAO) <FAÇA> */}
                        {product?.price && <ProductPrice price={product?.price} />}
                     </>
                  )}
               </div>
               <div className="col-6 product-details-card">
                  {isLoading ? <ProductDescriptionLoader /> : (
                     <>
                        <h1 className="product-description-title">
                           Descrição do Produto
                        </h1>
                        <p className="product-description-text">
                           {product?.description}
                        </p>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductDetails;