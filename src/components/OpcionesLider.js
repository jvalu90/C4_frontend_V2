import React from "react";
import {Link } from "react-router-dom";
import Footer from './Footer';
import Cabecera from './Cabecera';
import 'bootstrap/dist/css/bootstrap.min.css';


function OpcionesLider() {
  return (
    <div>
      <Cabecera/>
      <div class="container">

      <div class="row">
        <h2 class="text-center">Opciones Usuario Lider</h2>
      </div>      

      <div class="row">
        <div class="btn-group" role="group" aria-label="Basic example">
        <Link to="CrudProyectos" className="btn btn-primary">Gestión de Proyectos</Link>   
        </div> 
      </div>
      
      <div class="row">
        <h2 class="text-center"> </h2>
      </div>      

      <div class="row">
        <div class="btn-group" role="group" aria-label="Basic example">
        <Link to="CrudActividades" className="btn btn-primary">Gestión de Actividades</Link>   
        </div> 
      </div>

      <div class="row">
        <h2 class="text-center"> </h2>
      </div>      

      <div class="row">
        <Link to="MenuInformesLider" className="btn btn-primary">Generar Informes</Link>  
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

export default OpcionesLider;