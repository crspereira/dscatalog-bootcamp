/* Pacote que disponibiliza a Camada de Serviço que Gerencia os
 * Resources e Repositories da Entidade Category").
 * @Service/@Component registra esta classe como um componente que participará
 * do sistema de injeção de dependêcia automatizado do Spring".
 * @Autowired trata a injeção/instânciação de dependência do Objeto anotado.
 */
package com.devsuperior.dscatalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	//dependecias
	@Autowired
	private CategoryRepository repository;
		
	//metodos
	@Transactional(readOnly = true)
	public List<Category> findAll() {
		return repository.findAll();
	}
	
}
