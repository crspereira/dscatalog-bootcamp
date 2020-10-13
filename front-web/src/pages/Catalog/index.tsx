import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss';


const Catalog = () => {
    /*Passo1: Quando o componente iniciar, buscar lista de produtos de maneira assincrona
              acessando o ciclo de vida dele com "useEffect(function () {}, []);"
              ou "useEffect(() => {}, []);"
     *Passo2: Quando a lista de produtos estiver disponível, popular
              um estado no componente e listá-las dinamicamente */

    //Passo1:
    useEffect(() => {
        console.log("Componente de Listagem iniciado!");
        /*fetch maneira mais simples e pouco profissional de acessar os dados
         *possui limitações: muito verboso, não suporta nativamente barra de progresso e query strings*/
        fetch('http://localhost:3000/products') //o Java acessa a api com proxy configurado no "package.json"
            .then(response => response.json()) // converte a promise resolvida em json
            .then(response => console.log(response)); //imprime a promise com o dados da API
 
    }, [])

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálogo de produtos
            </h1>
            <div className="catalog-products">
                <Link to="/products/1"><ProductCard /></Link>
                <Link to="/products/2"><ProductCard /></Link>
                <Link to="/products/3"><ProductCard /></Link>
                <Link to="/products/4"><ProductCard /></Link>
                <Link to="/products/5"><ProductCard /></Link>
                <Link to="/products/6"><ProductCard /></Link>
                <Link to="/products/7"><ProductCard /></Link>
                <Link to="/products/8"><ProductCard /></Link>
                <Link to="/products/9"><ProductCard /></Link>
                <Link to="/products/10"><ProductCard /></Link>
                <Link to="/products/11"><ProductCard /></Link>
                <Link to="/products/12"><ProductCard /></Link>
                <Link to="/products/13"><ProductCard /></Link>
                <Link to="/products/14"><ProductCard /></Link>
            </div>
        </div>
    );
}

export default Catalog;