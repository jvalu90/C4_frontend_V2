import React from "react";
import {Link } from "react-router-dom";
import Footer from './Footer';
import Cabecera from './Cabecera';
import 'bootstrap/dist/css/bootstrap.min.css';


function MenuInformesLider() {
  return (
    <div>
      <Cabecera/>
      <div class="container">

      <div class="row">
        <h2 class="text-center">Menu Informes</h2>
      </div>      

      <div class="row">
        <div class="btn-group" role="group" aria-label="Basic example">
        <Link to="InformeProyectosTerminados" className="btn btn-primary">Proyectos Terminados</Link>   
        </div> 
      </div>

      
      <div class="row">
        <h2 class="text-center"> </h2>
      </div>      

      <div class="row">
        <div class="btn-group" role="group" aria-label="Basic example">
        <Link to="InformeProyectosIniciados" className="btn btn-primary">Proyectos Iniciados</Link>     
        </div> 
      </div>

      <div class="row">
        <h2 class="text-center"> </h2>
      </div>
      
      <div class="row">
        <div class="btn-group" role="group" aria-label="Basic example">
        <Link to="InformeHorasporProyecto" className="btn btn-primary">Horas por Proyecto</Link>     
        </div> 
      </div>

      <div class="row">
        <h2 class="text-center"> </h2>
      </div>      

      <div class="row">
        <div class="btn-group" role="group" aria-label="Basic example">
        <Link to="InformeHorasporProyectoporEmpleado" className="btn btn-primary">Horas por Empleado y Proyecto</Link>     
        </div> 
      </div>

      <div class="row">
        <h2 class="text-center"> </h2>
      </div>  

      <div class="row">
        <div class="btn-group" role="group" aria-label="Basic example">
        <Link to="OpcionesLider" className="btn btn-primary">Ver Opciones de Usuario Lider</Link>      
        </div> 
      </div>

      <div class="row">
        <h2 class="text-center"> </h2>
      </div>      

    </div>

      <Footer/>
    </div>

  );
}

export default MenuInformesLider;