/* Pacote reponsável por trafegar os Dados das Entidades entre as camadas
 * de Resources e Service com classes simples.
 * Promove as vantagend de controlar quais dados irão para o Controlador e a API
 * disponibilizá-los para a aplicação e a segurança, pois possilbilita ocultar dados sensíveis
 */
package com.devsuperior.dscatalog.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

public class ProductDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	// variaveis de instância
	private Long id;
	private String name;
	private String description;
	private Double price;
	private String imgUrl;
	private Instant date;
	
	//dependecias
	private List<CategoryDTO> categories = new ArrayList<>();

	// contrutores
	public ProductDTO() {
	}
	public ProductDTO(Long id, String name, String description, Double price, String imgUrl, Instant date) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.imgUrl = imgUrl;
		this.date = date;
	}
	public ProductDTO(Product entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.description = entity.getDescription();
		this.price = entity.getPrice();
		this.imgUrl = entity.getImgUrl();
		this.date = entity.getDate();
	}
	public ProductDTO(Product entity, Set<Category> categories) {
		this(entity);
		categories.forEach(cat -> this.categories.add(new CategoryDTO(cat)));
	}
	

	// geters e setters
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public Instant getDate() {
		return date;
	}
	public void setDate(Instant date) {
		this.date = date;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public List<CategoryDTO> getCategories() {
		return categories;
	}
	
}
