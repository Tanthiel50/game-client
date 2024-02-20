// Layout.js
import React from 'react';
import MyNavbar from './NavBar';
import Footer from './Footer';


const Layout = ({ children }) => {
  return (
    <>
      <MyNavbar />
        <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;