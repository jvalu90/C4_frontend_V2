/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import {Link } from "react-router-dom";

const baseUrl='http://localhost:9000/projects/terminados?page=1&limit=10000'

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

function DetalleInformeProyectosTerminados() {
const styles= useStyles();
const [data, setData]=useState([]);

  const peticionGet=async()=>{
    await axios.get(baseUrl)
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
    <h3>Informe Proyectos Terminados</h3>  
    <Link to="/MenuInformesLider" className="btn btn-primary">Ir a menu informes Usuario Lider</Link> {"   "} <br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Nombre</TableCell>
             <TableCell>Descripcion</TableCell>
             <TableCell>SubAlterno asignado</TableCell>
             <TableCell>Finalizado</TableCell>
             <TableCell>Fecha de Inicio</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(proyecto=>(
             <TableRow key={proyecto._id}>
               <TableCell>{proyecto.nombre}</TableCell>
               <TableCell>{proyecto.descripcion}</TableCell>
               <TableCell>{proyecto.usuario_asignado}</TableCell>
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

export default DetalleInformeProyectosTerminados;
