/* Pacote que disponibiliza a camada de controladores(forma de implementar) o REST.
 * Recursos(Conceito) que serão disponibilizados para as aplicações no Front-End
 * consumir, que por sua vez, é diponibilizada pela API do BackEnd.
 * Classe para responder as requisições REST (Recurso REST da "Entidade Category").
 */

package com.devsuperior.dscatalog.resourses;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dscatalog.entities.Category;

@RestController
@RequestMapping(value = "/categories" ) /* rota dos endpoints */
public class CategoryResource {
	
	/* endpoints deste recurso */
	@GetMapping
	public ResponseEntity<List<Category>> findAll() {
		List<Category> list = new ArrayList<>();
		list.add(new Category(1L, "Books"));
		list.add(new Category(2L, "Electronics"));
		
		return ResponseEntity.ok().body(list);		
	}
	
}
