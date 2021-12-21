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

function DetalleInformeProyectosAsignados() {
const styles= useStyles();
const [data, setData]=useState([]);

  const peticionGet=async()=>{
    const usuario=cookies.get('usuario');
    await axios.get('http://localhost:9000/projects/asignados?usuario='+usuario)
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
    <h3>Proyectos asignadas al Usuario Subalterno {cookies.get('usuario')} </h3>  
    <Link to="/OpcionesSubalterno" className="btn btn-primary">Ir a menu informes Usuario SubAlterno</Link>  <br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Proyecto</TableCell>
             <TableCell>Descripción</TableCell>
             <TableCell>Finalizado</TableCell>
             <TableCell>Fecha inicial</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(proyecto=>(
             <TableRow>
               <TableCell>{proyecto.nombre}</TableCell>
               <TableCell>{proyecto.descripcion}</TableCell>
               <TableCell>{proyecto.finalizado}</TableCell>
               <TableCell>{proyecto.fecha_inicio}</TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
    </div>
  );
}
export default DetalleInformeProyectosAsignados;