/*Alert.tsx se trata de um componente React
* utilizado/importado no App.tsx */
import React from 'react';

//Props é um tipo utilizado para a declarão de parametros "IMUTÁVEIS# que podem ou não 
//ser passados na chamada de de um componente react "parmX"= nome da variável.
// o "?" tira a obrigatoriedade e o "string" é o tipo da variável.
type Props = {
    param1: string;
    param2?: string;
}

//## vai Representar os parâmetors ESTATICAMANTE! #### para dinamismo necessário STATES
const Alert = ({ param1, param2}: Props) => {
    return (
        //o "alert alert-primary" é um component do FrameWork Bootstrap
        <div className="alert alert-primary">
            Hello {param1} {param2}!
        </div>
    );
}

export default Alert;