import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import ProductCard from './components/ProductCard';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import './styles.scss';


const Catalog = () => {
    //Passo2: lista componente
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);

    //Passo1: inicia componente
    useEffect(() => {
        const params = {
            page: 0,
            linesPerPage: 12
        }
        //inica o loader
        setIsLoading(true);
        //makeRequest é uma função personalizada armazenda na pasta utils retornando o axios
        makeRequest( { url:'/products', params } )
        .then(response => setProductsResponse(response.data))
        //finaliza o loader
        .finally(() => {
            setIsLoading(false);
        })       
    }, []);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálogo de produtos
            </h1>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={ product.id }>
                            <ProductCard product={product}/>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default Catalog;