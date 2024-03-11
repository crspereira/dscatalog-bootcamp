package com.devsuperior.dscatalog.resources;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.factories.ProductFactory;
import com.devsuperior.dscatalog.utils.TokenUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ProductResourceIntegrationTests {
	
	// Mocka as requisições
	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objectMapper;
	
	// Providencia Auenticação
	@Autowired
	private TokenUtil tokenUtil;
	
	// Arrange Compartilhada
		//autenticacao
		private String adminUsername;
		private String adminPassword;
		//private String operatorUsername;
		//private String operatorPassword;
	
		private long existingId;
		private long nonExistingId;
		private long countTotalProducts;
		private ProductDTO productDTO;

	@BeforeEach
	void setup() throws Exception {
		//autenticacao
		adminUsername = "maria@gmail.com";
		adminPassword = "123456";
		//operatorUsername = "alex@gmail.com";
		//operatorPassword = "123456";
		
		//parametros de teste
		existingId = 1L;
		nonExistingId = 0L;
		countTotalProducts = 25L;
		productDTO = ProductFactory.creteNewProductDTO();
	}
	
	@Test
	public void findAllPagedReturnSortedPageWhenSortedByName() throws Exception {
		// Arrange
		// Acting
		ResultActions result = mockMvc.perform(get("/products?page=0&size=12&sort=name,ASC")
				.accept(MediaType.APPLICATION_JSON));
		// Assert
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.content").exists());
		result.andExpect(jsonPath("$.totalElements").exists());
		result.andExpect(jsonPath("$.totalElements").value(countTotalProducts));
		result.andExpect(jsonPath("$.content[0].name").value("Macbook Pro"));
		result.andExpect(jsonPath("$.content[1].name").value("PC Gamer"));
		result.andExpect(jsonPath("$.content[2].name").value("PC Gamer Alfa"));
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() throws Exception {
		// Autorization
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);
		
		// Arrange
		Long expectedId = productDTO.getId();
		String expectedName = productDTO.getName();
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		// Acting
		ResultActions result = mockMvc.perform(put("/products/{id}", existingId)
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON));
		// Assert
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.id").value(expectedId));
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.name").value(expectedName));
	}

	@Test
	public void updateShouldReturnNotFoundWhenIdDoesExist() throws Exception {
		// Autorization
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);
		
		// Arrange
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		// Acting
		ResultActions result = mockMvc.perform(put("/products/{id}", nonExistingId)
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON));
		// Assert
		result.andExpect(status().isNotFound());
	}

}
