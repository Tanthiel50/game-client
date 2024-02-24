import React from "react";
import './styles/App.scss';
import RouterOutlet from "./pages/components/RouterOutlet";
import { UserProvider } from "./context/UserProvider";
import Layout from "./pages/components/layout/Layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <UserProvider>
        <Layout>
          <RouterOutlet />
        </Layout>
      </UserProvider>
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;
