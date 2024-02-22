import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance as axios } from '../../../http-common/axios-configuration';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

const CreateWord = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { user } = useUserContext();
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        setCategories(response.data);
      } catch (error) {
        toast.error('Erreur lors du chargement des catégories');
        console.error('Erreur lors du chargement des catégories', error);
      }
    };
  
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    // Ajout des données autres que les catégories et l'image
    formData.append('term', data.term);
    formData.append('definition', data.definition);
    formData.append('user_id', user.id); // Assurez-vous que l'ID utilisateur est correctement récupéré
    
    // Gestion des catégories multiples
    Object.keys(data.categories).forEach(categoryId => {
      if (data.categories[categoryId]) { // Si la catégorie est cochée
        formData.append('category_id[]', categoryId);
      }
    });
  
    // Gestion de l'image
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/words', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Mot créé avec succès');
      reset();
      navigate('/admin/words');
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
        <h1>Créer un mot</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="form-group">
            <label>Mot:</label>
            <input {...register("term", { required: true })} />
            {errors.term && <span className="error-message">Ce champ est requis</span>}
          </div>
          <div className="form-group">
            <label>Définition:</label>
            <textarea {...register("definition", { required: true })} />
            {errors.definition && <span className="error-message">Ce champ est requis</span>}
          </div>
          <div className="form-group">
            <label>Vignette:</label>
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Aperçu de la miniature"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <input 
              type="file" 
              {...register("image", { required: true })} 
              onChange={handleThumbnailChange}
              alt="image" 
            />
            {errors.image && <span className="error-message">Ce champ est requis</span>}
          </div>
          <div className="form-group">
  <label>Catégories:</label>
  {categories.map(category => (
    <div key={category.id}>
      <input
        type="checkbox"
        {...register(`categories.${category.id}`)} // Utilisez un objet pour enregistrer les catégories cochées
      />
      <label htmlFor={`category-${category.id}`}>{category.name}</label>
    </div>
  ))}
</div>
          <div>
            <button type="submit" className="button-5">Créer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWord;