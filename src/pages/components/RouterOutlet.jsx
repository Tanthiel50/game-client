import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import LoginForm from "../LoginForm";




const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default RouterOutlet;