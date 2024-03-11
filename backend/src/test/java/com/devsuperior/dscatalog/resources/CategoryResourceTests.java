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

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.factories.CategoryFactory;
import com.devsuperior.dscatalog.services.CategoryService;
import com.devsuperior.dscatalog.services.execeptions.DatabaseException;
import com.devsuperior.dscatalog.services.execeptions.ResourceNotFoundException;
import com.devsuperior.dscatalog.utils.TokenUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
//@WebMvcTest(CategoryResource.class)
public class CategoryResourceTests {

	// Mocka as requisições
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper objectMapper;

	// Mocka as dependencias com alguns beans de sistema
	@MockBean
	private CategoryService service;
	
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
		private CategoryDTO categoryDTO;
		private PageImpl<CategoryDTO> pageCategoryDTO; // PageImpl Objeto concreto da Interface Page

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
		categoryDTO = CategoryFactory.createNewCategoryDTO();
		pageCategoryDTO = new PageImpl<>(List.of(categoryDTO));

		// ## Configurando os comportamentos simulados do CategoryService
		Mockito.when(service.findAllPaged(ArgumentMatchers.any())).thenReturn(pageCategoryDTO);

		Mockito.when(service.findById(existingId)).thenReturn(categoryDTO);
		Mockito.when(service.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		
		Mockito.when(service.insert(ArgumentMatchers.any())).thenReturn(categoryDTO);

		Mockito.when(service.update(ArgumentMatchers.eq(existingId), ArgumentMatchers.any())).thenReturn(categoryDTO);
		Mockito.when(service.update(ArgumentMatchers.eq(nonExistingId), ArgumentMatchers.any())).thenThrow(ResourceNotFoundException.class);
		
		doNothing().when(service).delete(existingId);
		doThrow(ResourceNotFoundException.class).when(service).delete(nonExistingId);
		doThrow(DatabaseException.class).when(service).delete(dependentId);
	}

	@Test
	public void findAllShouldReturnPageCategoryDTO() throws Exception {
		// Arrange
		// Acting
		ResultActions result = mockMvc.perform(get("/categories")
				.accept(MediaType.APPLICATION_JSON));
		// Assert
		result.andExpect(status().isOk());
		Mockito.verify(service, Mockito.times(1)).findAllPaged(ArgumentMatchers.any());
	}

	@Test
	public void findByIdShouldReturnCategoryDTOWhenIdExists() throws Exception {
		// Arrange
		// Acting
		ResultActions result = mockMvc.perform(get("/categories/{id}", existingId)
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
		ResultActions result = mockMvc.perform(get("/categories/{id}", nonExistingId)
				.accept(MediaType.APPLICATION_JSON));
		// Assert
		result.andExpect(status().isNotFound());
		Mockito.verify(service, Mockito.times(1)).findById(nonExistingId);
	}
	
	@Test
	public void insertShouldReturnCategoryDTOAndCreated() throws Exception {
		// Autorization
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);
				
		// Arrange
		String jsonBody = objectMapper.writeValueAsString(categoryDTO);
		// Acting
		ResultActions result = mockMvc.perform(post("/categories")
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
	public void updateShouldReturnCategoryDTOWhenIdExists() throws Exception {
		// Autorization
		String accessToken = tokenUtil.obtainAccessToken(mockMvc, adminUsername, adminPassword);
				
		// Arrange
		String jsonBody = objectMapper.writeValueAsString(categoryDTO);
		// Acting
		ResultActions result = mockMvc.perform(put("/categories/{id}", existingId)
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
		String jsonBody = objectMapper.writeValueAsString(categoryDTO);
		// Acting
		ResultActions result = mockMvc.perform(put("/categories/{id}", nonExistingId)
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
		ResultActions result = mockMvc.perform(delete("/categories/{id}", existingId)
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
		ResultActions result = mockMvc.perform(delete("/categories/{id}", nonExistingId)
				.header("Authorization", "Bearer " + accessToken)
				.accept(MediaType.APPLICATION_JSON));
		// Assert
		result.andExpect(status().isNotFound());
		Mockito.verify(service, Mockito.times(1)).delete(nonExistingId);
	}

}
