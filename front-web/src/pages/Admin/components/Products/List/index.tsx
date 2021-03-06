import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Cards';
import CardLoader from '../Loaders/ProductCardLoader';
import './styles.scss';

const List = () => {
   //Passo2: lista componente
   const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
   const [isLoading, setIsLoading] = useState(false);
   //representa a pagina ativa que estará sendo randerizada
   const [activePage, setActivePage] = useState(0);
   const history = useHistory();

   const getProducts = useCallback(() => {
      const params = {
         page: activePage,
         linesPerPage: 4,
         direction: 'DESC',
         orderBy: 'id'
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
   }, [activePage])

   //console.log(productsResponse);

   //Passo1: inicia componente
   useEffect(() => {
          getProducts();    
   }, [getProducts]);

   const handleCreate = () => {
      history.push('/admin/products/create')
   }
   const onRemove = (productId: number) => {
      const confirm = window.confirm('Deseja Realmente Excluir este Produto?');

      if (confirm) {
         makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE'})
         .then(() => {
            toast.success('Produto Removido com Sucesso!');
            getProducts();
         })
         .catch(() => {
            toast.error('Erro ao Remover o Produto!');
         })
      }
   }

   return (
      <div className="admin-products-list">
         <button className="btn btn-primary btn-lg" onClick={handleCreate}>
            ADICIONAR
         </button>
         <div className="admin-list-container">
            {isLoading ? <CardLoader /> : (
               productsResponse?.content.map(product => (
                  <Card product={product} key={product.id} onRemove={onRemove}/>
               ))
            )}
            {productsResponse && (
               <Pagination 
                  totalPages={productsResponse.totalPages}
                  activePage={activePage}
                  //invoka a função que passa o item da pagina clicada
                  onChange={page => setActivePage(page)}
               />
            )}
         </div>
      </div>
   );
}

export default List;