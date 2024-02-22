import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance as axios } from '../../../http-common/axios-configuration';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

function CreateUser() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    
    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }
    
    try {
      await axios.post('http://127.0.0.1:8000/api/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    //   for (var pair of formData.entries()) {
    //     console.log(pair[0] + ", " + pair[1]);
    //   }
      toast.success('Utilisateur créé avec succès');
      navigate('/admin/users');
    } catch (error) {
        // Vérification de la présence d'un message d'erreur dans la réponse du back-end
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // Si l'erreur contient une structure détaillée (par exemple, des champs spécifiques en erreur)
          if (typeof error.response.data.message === "object") {
            const messages = Object.values(error.response.data.message).join(
              ". "
            );
            toast.error(`Erreur : ${messages}`);
          } else {
            // Si l'erreur est une chaîne simple
            toast.error(`Erreur : ${error.response.data.message}`);
          }
        } else {
          // Message d'erreur générique si la réponse du back-end ne contient pas de détail
          toast.error(
            "Une erreur est survenue lors de la création du mot."
          );
        }
        console.error("Erreur de soumission:", error);
      }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <h1>Créer un utilisateur</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="form-group">
            <label>Nom:</label>
            <input className="form-control" {...register("name", { required: "Ce champ est requis" })} />
            {errors.name && <div className="text-danger">{errors.name.message}</div>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input className="form-control" type="email" {...register("email", { required: "Ce champ est requis" })} />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </div>
          <div className="form-group">
            <label>Mot de passe:</label>
            <input className="form-control" type="password" {...register("password", { required: "Ce champ est requis" })} />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
          </div>
          <div className="form-group">
            <label>Avatar:</label>
            {thumbnailPreview && <img src={thumbnailPreview} alt="Aperçu" style={{ width: "100px", height: "100px" }} />}
            <input className="form-control" type="file" {...register("avatar", { required: false })} onChange={handleThumbnailChange} />
          </div>
          <button type="submit" className="btn btn-primary">Créer</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
