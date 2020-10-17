import { makeRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseFormAdmin from '../../BaseFormAdmin';
import './styles.scss';

type FormState = {
   name: string,
   category: string,
   price: string,
   description: string
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const ProductForm = () => {
   const [formData, setFormData] = useState<FormState>({
      name: '',
      category: '',
      price: '',
      description: ''
   });
   //caputurando o evento com a variável "event" do tipo "React.ChangeEvent<HTMLInputElement>"
   const handleOnChange = (event: FormEvent) => {
      //altera a variável name com os valor dos eventos armazenados em value
      const name = event.target.name;
      const value = event.target.value;
      //conserva tudo de informação "data". E a função retorna para o setFormData tudo que já
      //existia armazenado "...data" no formulario, acrescentado da propriedade dinâmica [name]: value
      setFormData(data => ({ ...data, [name]: value }));
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const payload = {
         ...formData,
         //imgUrl: 'https://imagens.canaltech.com.br/ofertas/o14307.1.jpg',
         imgUrl: 'https://carrefourbr.vtexassets.com/arquivos/ids/6425974/MP10836593_USADO---Xbox-360-Slim-4GB---Microsoft_1_Zoom.jpg?v=637343747981730000',
         categories: [{ id: formData.category}]
      }
      makeRequest({ url:'/products', method:'POST', data: payload})
         .then( () => {
            setFormData({name:'', category:'', price:'', description: ''});
         })
      console.log(payload);

   }
   return (
      <form onSubmit={handleSubmit}>
         <BaseFormAdmin title="Cadastrar um Produto">
            <div className="row mt-4">
               <div className="col-6">
                  <input
                     value={formData.name}
                     name="name"
                     type="text"
                     className="form-control"
                     onChange={handleOnChange}
                     placeholder="Nome do Produto" />
                  <select
                     value={formData.category}
                     name="category"
                     className="form-control mt-3"
                     onChange={handleOnChange}>
                     <option value="categories">Categorias</option>
                     <option value="1">Livros</option>
                     <option value="2">Eletônicos</option>
                     <option value="3">Computadores</option>
                  </select>
                  <input
                     value={formData.price}
                     name="price"
                     type="text"
                     className="form-control mt-3"
                     onChange={handleOnChange}
                     placeholder="Preço" />
               </div>
               <div className="col-6">
                  <textarea
                     value={formData.description}
                     name="description"
                     cols={30}
                     rows={10}
                     className="form-control"
                     onChange={handleOnChange} />
               </div>
            </div>
         </BaseFormAdmin>
      </form>
   );
}

export default ProductForm;