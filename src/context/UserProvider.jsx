import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance as axios } from '../http-common/axios-configuration';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const response = await axios.get("/me");
          setUser(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des informations de l'utilisateur", error);
          // Gérer l'erreur, par exemple en supprimant le token invalide
          localStorage.removeItem("token");
        }
      }
    };

    fetchUser();
  }, []);

  // Exposer l'état et les fonctions de mise à jour
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
