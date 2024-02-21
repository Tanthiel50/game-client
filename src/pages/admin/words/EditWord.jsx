import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from '../../../context/UserProvider';
import Sidebar from "../../components/admin/Sidebar";

const EditWord = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const [article, setArticle] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [newThumbnail, setNewThumbnail] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/words/${id}`
        );
        setArticle(response.data);

        // Pré-remplissez le formulaire avec les données existantes
        const fields = [
          "term",
          "definition",
          "image",
        ];
        fields.forEach((field) => setValue(field, response.data[field]));
        if (response.data.image) {
          setThumbnailPreview(
            `http://127.0.0.1:8000/storage/images/${response.data.image}`
          );
        }
        if (article && article.pointThumbnail) {
          setCurrentThumbnail(`http://127.0.0.1:8000/storage/images/${article.image}`);
      }
      } catch (error) {
        console.error("Erreur lors de la récupération du mot:", error);
      }
    };

    fetchArticle();
  }, [id, setValue]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file); // Débuggez pour voir le fichier sélectionné
        setNewThumbnail(file);
        setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        // Ajoutez toutes les données sauf l'image pour le moment
        if (key !== "image") {
            formData.append(key, data[key]);
        }
    });

    // Ajoutez l'image uniquement si une nouvelle a été sélectionnée
    if (newThumbnail) {
        formData.append("image", newThumbnail);
    }

    // Vérifiez si un utilisateur est attaché et ajoutez son ID
    if (user && user.id) {
        formData.append("user_id", user.id);
    }

    try {
        await axios.post(`http://127.0.0.1:8000/api/words/edit/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        toast.success('Le mot a été modifié avec succès!');
        // Redirigez ici après la réussite ou réinitialisez le formulaire
    }catch (error) {
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

  if (!article) return <div>Chargement...</div>;

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <h1>Modifier le mot</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Mot:</label>
            <input {...register("term", { required: true })} />
            {errors.term && <span>Ce champ est requis</span>}
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input {...register("definition", { required: true })} />
            {errors.definition && <span>Ce champ est requis</span>}
          </div>
          <div className="form-group">
            <label>Image actuel:</label>
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Miniature"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <input
              type="file"
              {...register("image")}
              onChange={handleThumbnailChange}
            />
            {errors.image && <span>Ce champ est requis</span>}
          </div>
          <button type="submit" className="button-5">
            Sauvegarder les modifications
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditWord;