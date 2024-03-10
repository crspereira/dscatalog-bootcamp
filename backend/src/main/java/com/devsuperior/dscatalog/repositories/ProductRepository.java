/* Pacote que disponibiliza a Camada de acesso a DADOS com JPA Repository").
 * Interface de acesso aos dados da "Entidade Product".
 * @Repository registra esta classe como um componente Injetável.
 * do sistema de injeção de dependêcia automatizado do Spring".
 * */
package com.devsuperior.dscatalog.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	/* FORMA NORMAL CONJUNIVA:
	 * É um conjunto de condicoes unidada do AND(E)nao misturanado AND com OR.
	 * No entanto, cada conidicao pode possuir um OR dentro do parenteses.
	 * VANTAGEM: Se a primeira condicao AND der falso o restante nao eh analisada.
	 * */
	
	@Query("SELECT DISTINCT obj FROM Product obj INNER JOIN obj.categories cats WHERE " //seleciona os produtos (nao repetidos) e sua lista de categorias
			+ "(:#{#categories == null} IS TRUE OR cats IN :categories) AND " //onde a Lista de categorias nao existir OU onde se a categorias do produto(cats), se alguma delas, pertence a lista de categorias(categories)
			+ "(LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%')))") //E se nome(minisculo/maisculo)contem o nome enviado.
	Page<Product> findPagedWithDetail(String name, List<Category> categories, Pageable pageable);
	
	/*(:#{null eq #accountNames} IS TRUE OR ...-> É uma SpEL (Spring Expression Language)
	 * ou ((:#{#categories == null} = true) OR ...
	 * https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/expressions.html
	 * 
	 *(COALESCE(:categories) IS NULL -> nao funaciona com H2 dataBase
	 **/
	
	//busca auxiliar para resolver o problema de N+1. Busca apenas as categorias dos produtos que pertencam a lista "products"
	//Join Fetch já tras a lista de Categorias e armazena na memoria. Funciona apenas com Listas. 
	@Query("SELECT obj FROM Product obj JOIN FETCH obj.categories WHERE obj IN :products")
	List<Product> findProductsWithCategories(List<Product> products);

}
