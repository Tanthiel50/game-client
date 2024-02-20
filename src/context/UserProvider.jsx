// UserProvider.jsx
import { axiosInstance as axios } from '../http-common/axios-configuration';
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const authentification = async () => {
		try {
			const response = await axios.get("/me");
			setUser(response);
		} catch (error) {
		}
		console.log(user)
	};

	return (
		<UserContext.Provider value={{ user, setUser, authentification }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);