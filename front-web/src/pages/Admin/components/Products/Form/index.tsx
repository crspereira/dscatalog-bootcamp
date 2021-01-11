import React, { useEffect, useState } from 'react';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';
import BaseFormAdmin from '../../BaseForm';
import { Category } from 'core/types/Product';

import './styles.scss';

type FormState = {
   name: string,
   price: string,
   description: string,
   imgUrl: string,
   categories:Category[]
}

type ParamsType = {
   productId: string;
}

const Form = () => {
   const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
   const history = useHistory();
   const { productId } = useParams<ParamsType>();
   const [isLoadingCategories, setIsLoadingCategories] = useState(false);
   const [categories, setCategories] = useState<Category[]>( [] );
   const isEditing = productId !== 'create';
   const formTitle = isEditing ? 'Editar Produto' : 'Cadastrar um Produto'; 

   useEffect(() => {
      if (isEditing) {
         makeRequest({ url: `/products/${productId}` })
         .then(response => {
            setValue('name', response.data.name);
            setValue('categories', response.data.categories);
            setValue('price', response.data.price);
            setValue('imgUrl', response.data.imgUrl);
            setValue('description', response.data.description)
         })
      }
   }, [productId, isEditing, setValue]);

   useEffect(() => {
      setIsLoadingCategories(true);
      makeRequest({ url: '/categories' })
         .then(response => setCategories(response.data.content))
         .finally(() => setIsLoadingCategories(false));
   }, []);
 
   const onSubmit = (data: FormState) => {
      console.log(data);
      makePrivateRequest({
         url: isEditing ? `/products/${productId}` : '/products',
         method: isEditing ? 'PUT' : 'POST',
         data
      })
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
         <BaseFormAdmin title={formTitle}>
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
                  <div className="margin-botton-30">
                     <Controller
                        as={Select}
                        name="categories"
                        rules={{ required: true}}
                        control={control}
                        isLoading={isLoadingCategories}
                        options={categories}
                        getOptionValue={(option: Category) => String(option.id)}
                        getOptionLabel={(option: Category) => option.name}
                        classNamePrefix="categories-select"
                        placeholder="Categorias"
                        isMulti
                     />
                     {errors.categories && (
                        <div className="invalid-feedback d-block">
                           Campo Obrigatório
                        </div>
                     )}
                  </div>
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
                        name="imgUrl"
                        type="text"
                        className="form-control input-base"
                        placeholder="URL da Imagem"
                     />
                     {errors.imgUrl && (
                        <div className="invalid-feedback d-block">
                           {errors.imgUrl.message}
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

export default Form;