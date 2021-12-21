import React from "react";
import {Link } from "react-router-dom";
import Footer from './Footer';
import Cabecera from './Cabecera';
import 'bootstrap/dist/css/bootstrap.min.css';


function OpcionesSubalterno() {
  return (
    <div>
      <Cabecera/>
      <div class="container">

      <div class="row">
        <h2 class="text-center">Opciones Usuario Subalterno</h2>
      </div>      

      <div class="row">
        <div class="btn-group" role="group" aria-label="Basic example">
        <Link to="InformeProyectosAsignados" className="btn btn-primary">Ver Proyectos Asignados</Link>   
        </div> 
      </div>

      
      <div class="row">
        <h2 class="text-center"> </h2>
      </div>      

      <div class="row">
        <div class="btn-group" role="group" aria-label="Basic example">
        <Link to="InformeActividadesAsignadas" className="btn btn-primary">Ver actividades de un proyecto asignado</Link>      
        </div> 
      </div>

      <div class="row">
        <h2 class="text-center"> </h2>
      </div>      

      <div class="row">
        <div class="btn-group" role="group" aria-label="Basic example">
        <Link to="CrudActividadesSubalterno" className="btn btn-primary">Cargar horas y estado de una actividad de un proyecto</Link>  
        </div> 
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

export default OpcionesSubalterno;