/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Link } from "react-router-dom";

const baseUrl='http://localhost:9000/projects/horas_por_proyecto_empleado'

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

function DetalleInformeHorasporProyectoporEmpleado() {
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
    <h3>Informe Horas por Proyecto por Usuario Subalterno</h3>  
    <Link to="/MenuInformesLider" className="btn btn-primary">Ir a menu informes Usuario Lider</Link> {"   "} <br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Proyecto</TableCell>
             <TableCell>Usuario Subalterno Asignado</TableCell>
             <TableCell>Total Horas Planeado</TableCell>
             <TableCell>Total Horas Ejecutado</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(proyecto=>(
             <TableRow>
               <TableCell>{proyecto._id.proyecto}</TableCell>
               <TableCell>{proyecto._id.usuario_asignado}</TableCell>
               <TableCell>{proyecto.total_horas_planeado}</TableCell>
               <TableCell>{proyecto.total_horas_ejecutado}</TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
    </div>
  );
}

export default DetalleInformeHorasporProyectoporEmpleado;