/* Pacote que disponibiliza a Camada de acesso a DADOS com JPA Repository").
 * Interface de acesso aos dados da "Entidade Product".
 * @Repository registra esta classe como um componente Injetável.
 * do sistema de injeção de dependêcia automatizado do Spring".
 * */
package com.devsuperior.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
