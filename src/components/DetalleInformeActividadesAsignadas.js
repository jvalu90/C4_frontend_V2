/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Link } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const baseUrl='http://localhost:9000/projects/data'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function DetalleInformeActividadesAsignadas() {
const styles= useStyles();
const [data, setData]=useState([]);

  const peticionGet=async()=>{
    const usuario=cookies.get('usuario');
    //await axios.get('http://localhost:9000/projects/asignados?usuario='+usuario)
    await axios.get('http://localhost:9000/projects/info_actividades_asignadas?usuario='+usuario)
    .then(response=>{
      console.log(response.data);
      setData(response.data);
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async()=>{
    await peticionGet();
  },[])

  return (
    <div className="App">
      <br />
    <h3>Información de Actividades asignadas al Usuario Subalterno {cookies.get('usuario')} </h3>  
    <Link to="/OpcionesSubalterno" className="btn btn-primary">Ir a menu informes Usuario SubAlterno</Link>  <br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Proyecto</TableCell>
             <TableCell>Actividad</TableCell>
             <TableCell>Horas planeadas</TableCell>
             <TableCell>Horas ejecutadas</TableCell>
             <TableCell>Estado</TableCell>
             <TableCell>Fecha Inicial</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(actividad=>(
             <TableRow>
               <TableCell>{actividad.proyecto}</TableCell>
               <TableCell>{actividad.descripcion}</TableCell>
               <TableCell>{actividad.horas_planeado}</TableCell>
               <TableCell>{actividad.horas_ejecutado}</TableCell>
               <TableCell>{actividad.estado}</TableCell>
               <TableCell>{actividad.fecha_inicio}</TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
    </div>
  );
}
export default DetalleInformeActividadesAsignadas;

//************************************************************************** */