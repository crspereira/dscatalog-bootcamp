import { makePrivateRequest } from 'core/utils/request';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import BaseFormAdmin from '../../BaseFormAdmin';
import './styles.scss';

type FormState = {
   name: string,
   price: string,
   description: string,
   imageUrl: string
}

const ProductForm = () => {
   const { register, handleSubmit, errors } = useForm<FormState>();
   const history = useHistory();
 
   const onSubmit = (data: FormState) => {
      console.log(data);
      makePrivateRequest({ url:'/products', method:'POST', data })
         .then(() => {
            toast.success('Produto Salvo com Sucesso!');
            history.push('/admin/products');
         })
         .catch(() => {
            toast.error('Erro ao Salvar o Produto!');
         })
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <BaseFormAdmin title="Cadastrar um Produto">
            <div className="row mt-4">
               <div className="col-6">
                  <div className="margin-botton-30">
                     <input
                        ref={register({
                           required: "Campo Obrigatório",
                           minLength: { value: 5, message: 'O Campos deve ter no Mínimo 5 Caracteres'},
                           maxLength: { value: 60, message: 'O Campos deve ter no Máximo 60 Caracteres'}
                        })}
                        name="name"
                        type="text"
                        className="form-control input-base"
                        placeholder="Nome do Produto"
                     />
                     {errors.name && (
                        <div className="invalid-feedback d-block">
                           {errors.name.message}
                        </div>
                     )}
                  </div>
                  
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
                  <div className="margin-botton-30">
                     <input
                        ref={register({ required: "Campo Obrigatório" })}
                        name="price"
                        type="number"
                        className="form-control input-base"
                        placeholder="Preço"
                     />
                     {errors.price && (
                        <div className="invalid-feedback d-block">
                           {errors.price.message}
                        </div>
                     )}
                  </div>
                  <div className="margin-botton-30">
                     <input
                        ref={register({ required: "Campo Obrigatório" })}
                        name="imageUrl"
                        type="text"
                        className="form-control input-base"
                        placeholder="URL da Imagem"
                     />
                     {errors.imageUrl && (
                        <div className="invalid-feedback d-block">
                           {errors.imageUrl.message}
                        </div>
                     )}
                  </div>
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
                  {errors.description && (
                     <div className="invalid-feedback d-block">
                        {errors.description.message}
                     </div>
                  )}
               </div>
            </div>
         </BaseFormAdmin>
      </form>
   );
}

export default ProductForm;