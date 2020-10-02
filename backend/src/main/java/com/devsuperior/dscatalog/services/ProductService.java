/* Pacote que disponibiliza a Camada de Serviço que Gerencia os
 * Resources e Repositories da Entidade Product").
 * @Service/@Component registra esta classe como um componente que participará
 * do sistema de injeção de dependêcia automatizado do Spring".
 * @Autowired trata a injeção/instânciação de dependência do Objeto anotado.
 */
package com.devsuperior.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.execeptions.DatabaseException;
import com.devsuperior.dscatalog.services.execeptions.ResourceNotFoundException;

@Service
public class ProductService {

	// dependecias
	@Autowired
	private ProductRepository repository;

	// metodos
	//sem paginação
	/* @Transactional(readOnly = true) public List<ProductDTO> findAll() {
	 * List<Product> list = repository.findAll(); return list.stream().map(x -> new
	 * ProductDTO(x)).collect(Collectors.toList());
	 * 
	 * // Expressão Lambida - convertendo a lista Product para ProductDTO
	 * 
	 * List<ProductDTO> listDto = list.stream().map(x -> new
	 * ProductDTO(x)).collect(Collectors.toList()); return listDto;
	 * 
	 * 
	 * // Convencional - convertendo a lista Product para ProductDTO
	 * 
	 * List<ProductDTO> listDto = new ArrayList<>(); for (Product prod : list) {
	 * listDto.add(new ProductDTO(prod)); } return listDto;
	 * 
	 * }
	 */
	
	//com paginação
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {
		Page<Product> list = repository.findAll(pageRequest);
		return list.map(x -> new ProductDTO(x));
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repository.findById(id);
		Product entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not Found"));
		return new ProductDTO(entity, entity.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product();
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setPrice(dto.getPrice());
		entity.setImgUrl(dto.getImgUrl());
		entity.setDate(dto.getDate());
		entity = repository.save(entity);

		return new ProductDTO(entity);
	}

	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {
		try {
			Product entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity.setDescription(dto.getDescription());
			entity.setPrice(dto.getPrice());
			entity.setImgUrl(dto.getImgUrl());
			entity.setDate(dto.getDate());
			entity = repository.save(entity);

			return new ProductDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id Not Found " + id);
		}
	}

	// Sem @Transaction para possibilitar captura da excessão
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id Not Found! " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("integrity Violation!");
		}
	}
}
