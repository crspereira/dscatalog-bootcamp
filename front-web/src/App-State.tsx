/* App com exemplo de Alteração de Estado e Ciclo de Vida do Componente.
 O exemplo se trata de um contador dinâmico incremetado com o Hook "useState"
 com seu ciclo de vida conntrolado pelo Hook "useEfect"
*/
import React, { useState, useEffect} from 'react';

const App = () => {
  /*declaração padrao do "useState" nos componentes
  "const [parm, setParm] = useState();" onde o parm é o estado e o
  setParm é a função que vai alterar o estado parm. useState() é
  o valor inicial para  parm*/
  const [contador, setContador] = useState(0);

  /*declaração padrão do "useEffect" nos componenter
  "useEffect(() => {}, []);" 
  argumeto1"() => {}"= Start LifeCycle e argumento2"[]" = lista de dependecia
  vazia não depende de ningué e encerra o clico de vida*/
  
  useEffect(() => {console.log('componente iniciado!')}, []); //nao encrementa
  //useEffect(() => {console.log('componente iniciado!')}, [contador]); //encrementa

  //console.log('componente iniciado!')

    return (
      <div className="container mt-5">
        <button
          className="btn btn-primary mr-3"
          onClick={() => setContador(contador + 1)}
        >
          +
        </button>
        <span>
          {contador}      
        </span>
        <button
          className="btn btn-primary ml-3"
          onClick={() => setContador(contador - 1)}
        >
          -
        </button>

        {/* Utilizando o "Conditional Render" do React */}
        {contador > 5 && <h1>O valor é maior que 5</h1>}
        {contador <= 5 && <h1>não é</h1>}
        
      </div>
    );
  }

export default App;