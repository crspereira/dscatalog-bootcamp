package com.devsuperior.dscatalog.resources;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.factories.ProductFactory;
import com.devsuperior.dscatalog.services.ProductService;
import com.devsuperior.dscatalog.services.execeptions.DatabaseException;
import com.devsuperior.dscatalog.services.execeptions.ResourceNotFoundException;
import com.devsuperior.dscatalog.utils.TokenUtil;
import com.fasterxml.jackson.databind.ObjectMapper;


@SpringBootTest
@AutoConfigureMockMvc
//@WebMvcTest(ProductResource.class)
public class ProductResourceTests {

	// Mocka as requisições
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper objectMapper;

	// Mocka as dependencias com alguns beans de sistema
	@MockBean
	private ProductService service;
	
	// Providencia Auenticação
	@Autowired
	private TokenUtil tokenUtil;

	// Arrange Compartilhada
		private String adminUsername;
		private String adminPassword;
		//private String operatorUsername;
		//private String operatorPassword;
		
		private long existingId;
		private long nonExistingId;
		private long dependentId;
		private ProductDTO productDTO;
		private PageImpl<ProductDTO> pageProductDTO; // PageImpl Objeto concreto da Interface Page

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
		dependentId = 2L;
		productDTO = ProductFactory.creteNewProductDTO();
		pageProductDTO = new PageImpl<>(List.of(productDTO));

		// ## Configurando os comportamentos simulados do ProductService
		Mockito.when(service.findAllPaged(ArgumentMatchers.any())).thenReturn(pageProductDTO);
		Mockito.when(service.findAllPagedWithDetail(ArgumentMatchers.any(), any() ,any())).thenReturn(pageProductDTO);

		Mockito.when(service.findById(existingId)).thenReturn(productDTO);
		Mockito.when(service.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		
		Mockito.when(service.insert(ArgumentMatchers.any())).thenReturn(productDTO);

		Mockito.when(service.update(ArgumentMatchers.eq(existingId), ArgumentMatchers.any())).thenReturn(productDTO);
		Mockito.when(service.update(ArgumentMatchers.eq(nonExistingId), ArgumentMatchers.any())).thenThrow(ResourceNotFoundException.class);
		
		doNothing().when(service).delete(existingId);
		doThrow(ResourceNotFoundException.class).when(service).delete(nonExistingId);
		doThrow(DatabaseException.class).when(service).delete(dependentId);
	}

//	@Test
//	public void findAllPagedhouldReturnPageProductDTO() throws Exception {
//		// Arrange
//		// Acting
//		ResultActions result = mockMvc.perform(get("/products")
//				.accept(MediaType.APPLICATION_JSON));
//		// Assert
//		result.andExpect(status().isOk());
//		Mockito.verify(service, Mockito.times(1)).findAllPaged(ArgumentMatchers.any());
//	}
	
	@Test
	public void findAllPagedWithDetailShouldReturnPageProductDTOFilteredByNameOrCategory() throws Exception {
		// Arrange
		// Acting
		ResultActions result = mockMvc.perform(get("/products")
				.accept(MediaType.APPLICATION_JSON));
		// Assert
		result.andExpect(status().isOk());
		Mockito.verify(service, Mockito.times(1)).findAllPagedWithDetail(ArgumentMatchers.any(), any() ,any());
	}

	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() throws Exception {
		// Arrange
		// Acting
		ResultActions result = mockMvc.perform(get("/products/{id}", existingId)
				.accept(MediaType.APPLICATION_JSON));
		// Assert
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		Mockito.verify(service, Mockito.times(1)).findById(existingId);
	}

	@Test
	public void findByIdShouldReturnNotFoundWhenIdDoesExist() throws Exception {
		// Arrange
		// Acting
		ResultActions result = mockMvc.perform(get("/products/{id}", nonExistingId)
				.accept(MediaType.APPLICATION_JSON));
		// Assert
		result.andExpect(status().isNotFound());
		Mockito.verify(service, Mockito.times(1)).findById(nonExistingId);
	}
	
	@Test
	public void insertShouldReturnProductDTOAndCreated() throws Exception {
		// Autorization
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);
		
		// Arrange
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		// Acting
		ResultActions result = mockMvc.perform(post("/products")
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON));
		// Assert
		result.andExpect(status().isCreated());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		Mockito.verify(service, Mockito.times(1)).insert(any());
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() throws Exception {
		// Autorization
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);
				
		// Arrange
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
		result.andExpect(jsonPath("$.name").exists());
		Mockito.verify(service, Mockito.times(1)).update(eq(existingId), any());
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
		Mockito.verify(service, Mockito.times(0)).update(eq(existingId), any());
	}
	
	@Test
	public void deleteShouldReturnNoContentWhenIdExists() throws Exception {
		// Autorization
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);
				
		// Arrange
		// Acting
		ResultActions result = mockMvc.perform(delete("/products/{id}", existingId)
				.header("Authorization", "Bearer " + accessToken)
				.accept(MediaType.APPLICATION_JSON));
		// Assert
		result.andExpect(status().isNoContent());
		Mockito.verify(service, Mockito.times(1)).delete(existingId);
	}
	
	@Test
	public void deleteShouldReturnNoFoundWhenIdDoesNotExist() throws Exception {
		// Autorization
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);
				
		// Arrange
		// Acting
		ResultActions result = mockMvc.perform(delete("/products/{id}", nonExistingId)
				.header("Authorization", "Bearer " + accessToken)
				.accept(MediaType.APPLICATION_JSON));
		// Assert
		result.andExpect(status().isNotFound());
		Mockito.verify(service, Mockito.times(1)).delete(nonExistingId);
	}

}
