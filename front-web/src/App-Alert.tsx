import React from 'react';
//importanto o componente Alert.tsx
import Alert from './Alert';

//notação function
/* function App(){
  return <h1>Now let's learning React!</h1>;
} */

//notação arrow function
const App = () => {
    return (
      //<> esta randerizando o componente Alert.tsx importado
      //o "container" é um component responsivo e o "mt5" é um Utilitario,
      //ambos do FrameWork Bootstrap
      <div className="container mt-5">
        <Alert param1="Clayton" param2="Pereira"/>
        <Alert param1="Adriana" param2="Ferrari"/>
        <Alert param1="Guilherme"/>
        <Alert param1="Gabrielly"/>
      </div>
    );
  }

export default App;