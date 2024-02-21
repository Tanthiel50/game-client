import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import LoginForm from "../LoginForm";
import Admin from "../Admin";
import WordPage from "../admin/words/WordPage";
import CreateWord from "../admin/words/CreateWord";
import CategoryPage from "../admin/categories/CategoryPage";
import UserPage from "../admin/users/UserPage";
import RegisterForm from "../RegisterForm";
import EditWord from "../admin/words/EditWord";
import CreateCategorie from "../admin/categories/CreateCategorie";
import EditCategorie from "../admin/categories/EditCategorie";





const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/admin/words" element={<WordPage />} />
      <Route path="/admin/create-word" element={<CreateWord />} />
      <Route path="/admin/edit-word/:id" element={<EditWord />} />
      <Route path="/admin/categories" element={<CategoryPage />} />
      <Route path="/admin/create-categorie" element={<CreateCategorie />} />
      <Route path="/admin/edit-categorie/:id" element={<EditCategorie />} />
      <Route path="/admin/users" element={<UserPage />} />
    </Routes>
  );
};

export default RouterOutlet;