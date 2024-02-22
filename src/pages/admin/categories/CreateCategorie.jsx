import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance as axios } from '../../../http-common/axios-configuration';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

function CreateCategorie() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useUserContext();
    const navigate = useNavigate();
  
  
    const onSubmit = async (data) => {
      const formData = new FormData();
      for (const key in data) {
        if (key === "category_id") {
          // Pour chaque catégorie sélectionnée, ajoutez-la au formData
          data[key].forEach(categoryId => {
            formData.append('category_id[]', categoryId);
          });
        } else if (key === "image" && data[key].length > 0) {
          formData.append("image", data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }
      formData.append('user_id', user.id);
  
      try {
        await axios.post('/categories', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Mot créé avec succès');
        reset();
        navigate('/admin/categories');
      } catch (error) {
        // Vérification de la présence d'un message d'erreur dans la réponse du back-end
        if (error.response && error.response.data && error.response.data.message) {
          // Si l'erreur contient une structure détaillée (par exemple, des champs spécifiques en erreur)
          if (typeof error.response.data.message === 'object') {
            const messages = Object.values(error.response.data.message).join('. ');
            toast.error(`Erreur : ${messages}`);
          } else {
            // Si l'erreur est une chaîne simple
            toast.error(`Erreur : ${error.response.data.message}`);
          }
        } else {
          // Message d'erreur générique si la réponse du back-end ne contient pas de détail
          toast.error('Une erreur est survenue lors de la création du mot.');
        }
        console.error('Erreur de soumission:', error);
      }
  
  };
  
  
  
    return (
      <div className="admin-container">
        <Sidebar />
        <div className="admin-content">
          <h1>Créer une catégorie</h1>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="form-group">
              <label>Mot:</label>
              <input {...register("name", { required: true })} />
              {errors.name && <span className="error-message">Ce champ est requis</span>}
            </div>
            <div className="form-group">
              <label>Définition:</label>
              <textarea {...register("description", { required: true })} />
              {errors.description && <span className="error-message">Ce champ est requis</span>}
            </div>
            <div>
              <button type="submit" className="button-5">Créer</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default CreateCategorie