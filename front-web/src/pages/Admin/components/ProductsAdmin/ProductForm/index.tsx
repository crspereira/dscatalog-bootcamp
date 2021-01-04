import { makePrivateRequest } from 'core/utils/request';
import React from 'react';
import { useForm } from 'react-hook-form';
import BaseFormAdmin from '../../BaseFormAdmin';
import './styles.scss';

type FormState = {
   name: string,
   price: string,
   description: string,
   imageUrl: string
}

const ProductForm = () => {
   const { register, handleSubmit } = useForm<FormState>();
 
   const onSubmit = (data: FormState) => {
      //console.log(data);
      makePrivateRequest({ url:'/products', method:'POST', data });
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <BaseFormAdmin title="Cadastrar um Produto">
            <div className="row mt-4">
               <div className="col-6">
                  <input
                     ref={register({ required: "Campo Obrigatório" })}
                     name="name"
                     type="text"
                     className="form-control margin-botton-30 input-base"
                     placeholder="Nome do Produto"
                  />
                  {/* <select
                     value={formData.category}
                     name="category"
                     className="form-control mb-5"
                     onChange={handleOnChange}>
                     <option value="categories">Categorias</option>
                     <option value="1">Livros</option>
                     <option value="2">Eletrônicos</option>
                     <option value="3">Computadores</option>
                  </select> */}
                  <input
                     ref={register({ required: "Campo Obrigatório" })}
                     name="price"
                     type="number"
                     className="form-control margin-botton-30 input-base"
                     placeholder="Preço"
                  />
                  <input
                     ref={register({ required: "Campo Obrigatório" })}
                     name="imgUrl"
                     type="text"
                     className="form-control margin-botton-30 input-base"
                     placeholder="URL da Imagem"
                  />
               </div>
               <div className="col-6">
                  <textarea
                     ref={register({ required: "Campo Obrigatório" })}
                     name="description"
                     cols={30}
                     rows={10}
                     className="form-control input-base"
                     placeholder="Descrição"
                  />
               </div>
            </div>
         </BaseFormAdmin>
      </form>
   );
}

export default ProductForm;