import React  from "react";
import axios from 'axios';
import {useState, useffect} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavBar from './components/NavBar';
import Principal from './components/Principal';
import Login from './components/Login';
import OpcionesLider from './components/OpcionesLider';
import OpcionesSubalterno from "./components/OpcionesSubalterno";
import OpcionesAdministrador from "./components/OpcionesAdministrador";
import CrudProyectos from './components/CrudProyectos';
import CrudActividades from './components/CrudActividades';
import CrudUsuarios from './components/CrudUsuarios';
import DatosCuenta from './components/DatosCuenta';
import MenuInformesLider from './components/MenuInformesLider';
import InformeProyectosTerminados from './components/InformeProyectosTerminados';
import InformeProyectosIniciados from './components/InformeProyectosIniciados';
import InformeHorasporProyecto from './components/InformeHorasporProyecto';
import InformeHorasporProyectoporEmpleado from './components/InformeHorasporProyectoporEmpleado';
import InformeProyectosAsignados from './components/InformeProyectosAsignados';
import InformeActividadesAsignadas from './components/InformeActividadesAsignadas';
import CrudActividadesSubalterno from './components/CrudActividadesSubalterno';

function App() {

 return (
      <Router> 
      <NavBar />
      <Switch>
        <Route path="/Principal" exact>
          <Principal />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/OpcionesLider">
          <OpcionesLider />
        </Route>
        <Route path="/OpcionesSubalterno">
          <OpcionesSubalterno />
        </Route>
        <Route path="/OpcionesAdministrador">
          <OpcionesAdministrador />
        </Route>
        <Route path="/CrudProyectos">
          <CrudProyectos />
        </Route>
        <Route path="/CrudActividades">
          <CrudActividades />
        </Route>
        <Route path="/CrudUsuarios">
          <CrudUsuarios />
        </Route>
        <Route path="/DatosCuenta">
          <DatosCuenta />
        </Route>
        <Route path="/MenuInformesLider">
          <MenuInformesLider />
        </Route>
        <Route path="/InformeProyectosTerminados">
          <InformeProyectosTerminados />
        </Route>
        <Route path="/InformeProyectosIniciados">
          <InformeProyectosIniciados />
        </Route>
        <Route path="/InformeHorasporProyecto">
          <InformeHorasporProyecto />
        </Route>
        <Route path="/InformeHorasporProyectoporEmpleado">
          <InformeHorasporProyectoporEmpleado />
        </Route>
        <Route path="/InformeProyectosAsignados">
          <InformeProyectosAsignados />
        </Route>
        <Route path="/InformeActividadesAsignadas">
          <InformeActividadesAsignadas />
        </Route>
        <Route path="/CrudActividadesSubalterno">
          <CrudActividadesSubalterno />
        </Route>
      </Switch>
  </Router>
  );
}
export default App;    