import React from "react";
import {Link } from "react-router-dom";
import Footer from './Footer';
import Cabecera from './Cabecera';
import 'bootstrap/dist/css/bootstrap.min.css';


function OpcionesAdministrador() {
  return (
    <div>
      <Cabecera/>
      <div class="container">

      <div class="row">
        <h2 class="text-center">Opciones Usuario Administrador</h2>
      </div>  

      <div class="row">
        <Link to="OpcionesLider" className="btn btn-primary">Menú Usuario Lider</Link>   
      </div>

      <div class="row">
        <h2 class="text-center"> </h2>
      </div>      

      <div class="row">
        <Link to="OpcionesSubalterno" className="btn btn-primary">Menú Usuario Subalterno</Link>  
      </div>

      <div class="row">
        <h2 class="text-center"> </h2>
      </div>      

      <div class="row">
        <Link to="CrudUsuarios" className="btn btn-primary">Gestión de Usuarios</Link>   
      </div>

      <div class="row">
        <h2 class="text-center"> </h2>
      </div>      

      <div class="row">
        <Link to="DatosCuenta" className="btn btn-primary">Modificar Datos de la Cuenta</Link>   
      </div>

      <div class="row">
        <h2 class="text-center"> </h2>
      </div>      

    </div>
      <Footer/>
    </div>

  );
}

export default OpcionesAdministrador;