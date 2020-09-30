/* Classe do Spring "@ControllerAdvice" responsável por interceptar @@ExceptionHandler
 * as exceções na camada de Resource(Controller) para não ficar implementando try/cacth
 * em todo método da camada que precise fazer um tratamento de execeção. */
package com.devsuperior.dscatalog.resourses.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.devsuperior.dscatalog.services.execeptions.EntityNotFoundException;

@ControllerAdvice
public class ResourceExceptionHandler {
	/* resposta de requisição onde o payload(conteudo) da resposta será um objeto do
	 * tipo StandardError, pois a estrutura de erro será customizado. */
	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(EntityNotFoundException e, HttpServletRequest request) {
		StandardError err = new StandardError();
		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.NOT_FOUND.value());
		err.setError("Resource Not Found!");
		err.setMessage(e.getMessage()); //mensagem setado no service
		err.setPath(request.getRequestURI());
		return ResponseEntity.status(HttpStatus.NOT_FOUND.value()).body(err);
	}
}
