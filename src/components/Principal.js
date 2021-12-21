import React from "react";
import {Link } from "react-router-dom";
import Cabecera from './Cabecera';
import ProyectlistCard from './Proyectlistitem';
import Footer from './Footer';

function Principal() {
  return (
    <div>
      <Cabecera/>
      <ProyectlistCard/>
      <Footer/>
    </div>

  );
}
export default Principal;