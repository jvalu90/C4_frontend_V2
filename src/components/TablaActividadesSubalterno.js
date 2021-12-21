/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import {Link } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const baseUrl='http://localhost:9000/activities/data'

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

function TablaActividadesSubalterno() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [ActividadSeleccionada, setActividadSeleccionada]=useState({
    _id: '',
    proyecto: '',
    descripcion:'',
    horas_planeado: 0,
    horas_ejecutado: 0,
    estado:'',
    fecha_inicio: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setActividadSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(ActividadSeleccionada);
  }

  const peticionGet=async()=>{
    const usuario=cookies.get('usuario');
    await axios.get('http://localhost:9000/projects/info_actividades_asignadas?usuario='+usuario)
    .then(response=>{
      console.log(response.data);
      setData(response.data);
    })
  }

  const peticionPostEditar=async()=>{
    console.log(ActividadSeleccionada);
    let data = JSON.stringify({
      _id: ActividadSeleccionada._id,
      proyecto: ActividadSeleccionada.proyecto,
      descripcion: ActividadSeleccionada.descripcion,
      // eslint-disable-next-line no-new-wrappers
      horas_planeado: new Number(ActividadSeleccionada.horas_planeado),
      // eslint-disable-next-line no-new-wrappers
      horas_ejecutado: new Number(ActividadSeleccionada.horas_ejecutado),
      estado: ActividadSeleccionada.estado,
      fecha_inicio: ActividadSeleccionada.fecha_inicio
    });
    console.log("obteniendo data transformada");
    console.log(data);
    const response = axios.post('http://localhost:9000/activities/update_subalterno/',data,{headers:{"Content-Type" : "application/json"}});
    abrirCerrarModalEditar();
    peticionGet();
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const seleccionarActividad=(actividad, caso)=>{
    setActividadSeleccionada(actividad);
    abrirCerrarModalEditar()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Cargar Horas Ejecutadas y estado de la actividad</h3>
      <TextField name="descripcion" className={styles.inputMaterial} label="Descripción de la actividad"  value={ActividadSeleccionada.descripcion}/>
      <br />
      <TextField name="proyecto" className={styles.inputMaterial} label="Proyecto Asociado"  value={ActividadSeleccionada.proyecto}/>
      <br />
      <TextField name="horas_ejecutado" className={styles.inputMaterial} label="Horas ejecutadas de duración" onChange={handleChange} value={ActividadSeleccionada && ActividadSeleccionada.horas_ejecutado}/>
      <br />
      <TextField name="estado" className={styles.inputMaterial} label="Estado" onChange={handleChange} value={ActividadSeleccionada && ActividadSeleccionada.estado}/>
      <br /><br />

      <div align="right">
        <Button color="primary" onClick={()=>peticionPostEditar()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <h2>Cargar horas y estado de una actividad de un proyecto. SubAlterno: {cookies.get('usuario')}</h2> 
      <br />
    <Link to="/OpcionesSubalterno" className="btn btn-primary">Ir a Opciones del Usuario Subalterno</Link> {"   "}  
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Actividad</TableCell>
             <TableCell>Proyecto</TableCell>
             <TableCell>Horas Estimado</TableCell>
             <TableCell>Horas Ejecutado</TableCell>
             <TableCell>Estado</TableCell>
             <TableCell>Fecha de Inicio</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(actividad=>(
             <TableRow key={actividad._id}>
               <TableCell>{actividad.descripcion}</TableCell>
               <TableCell>{actividad.proyecto}</TableCell>
               <TableCell>{actividad.horas_planeado}</TableCell>
               <TableCell>{actividad.horas_ejecutado}</TableCell>
               <TableCell>{actividad.estado}</TableCell>
               <TableCell>{actividad.fecha_inicio}</TableCell>
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarActividad(actividad, 'Actualizar información')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>
    </div>
  );
}

export default TablaActividadesSubalterno;