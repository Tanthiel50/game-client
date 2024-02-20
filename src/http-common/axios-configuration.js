// axios-configuration.js
import axios from "axios";

// Configuration de l'URL de base et d'autres paramètres par défaut
axios.defaults.baseURL = `http://127.0.0.1:8000/api`;
axios.defaults.withCredentials = false;

// Ajout du token d'authentification aux headers par défaut s'il existe
const TOKEN = localStorage.getItem("token");
if (TOKEN) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;
}

// Exportation de l'instance axios configurée
export const axiosInstance = axios;
