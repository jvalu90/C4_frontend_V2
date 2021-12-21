/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import {Link } from "react-router-dom";

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

function TablaActividades() {
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
    await axios.get(baseUrl)
    .then(response=>{
      console.log(response.data);
      setData(response.data);
    })
  }

  const peticionPostInsertar=async()=>{
    console.log(ActividadSeleccionada);
    let data = JSON.stringify({
      proyecto: ActividadSeleccionada.proyecto,
      descripcion: ActividadSeleccionada.descripcion,
      horas_planeado: ActividadSeleccionada.horas_planeado,
      horas_ejecutado: ActividadSeleccionada.horas_ejecutado,
      estado: ActividadSeleccionada.estado,
      fecha_inicio: ActividadSeleccionada.fecha_inicio   
    });
    const response = axios.post('http://localhost:9000/activities/new/',data,{headers:{"Content-Type" : "application/json"}});
    abrirCerrarModalInsertar();
    peticionGet();
    //window.location.reload();
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
    const response = axios.post('http://localhost:9000/activities/update_lider/',data,{headers:{"Content-Type" : "application/json"}});
    abrirCerrarModalEditar();
    peticionGet();
  }


  const peticionPostEliminar=async()=>{
    console.log(ActividadSeleccionada);
    let data = JSON.stringify({
      _id: ActividadSeleccionada._id,
      descripcion: ActividadSeleccionada.descripcion
    });
    const id_actividad= ActividadSeleccionada._id;
    const response = axios.post('http://localhost:9000/activities/delete?_id='+id_actividad,data,{headers:{"Content-Type" : "application/json"}});
    abrirCerrarModalEliminar();
    peticionGet();
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarActividad=(actividad, caso)=>{
    setActividadSeleccionada(actividad);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async()=>{
    await peticionGet();
  },[])


  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nueva actividad</h3>
      <TextField name="descripcion" className={styles.inputMaterial} label="Descripción de la actividad" onChange={handleChange}/>
      <br />
      <TextField name="proyecto" className={styles.inputMaterial} label="Proyecto Asociado" onChange={handleChange}/>
      <br />
      <TextField name="horas_planeado" className={styles.inputMaterial} label="Horas estimadas de duración" onChange={handleChange}/>
      <br />
      <TextField name="fecha_inicio" className={styles.inputMaterial} label="Fecha de inicio" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPostInsertar()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Actividad</h3>
      <TextField name="descripcion" className={styles.inputMaterial} label="Descripción de la actividad" onChange={handleChange} value={ActividadSeleccionada && ActividadSeleccionada.descripcion}/>
      <br />
      <TextField name="proyecto" className={styles.inputMaterial} label="Proyecto Asociado" onChange={handleChange} value={ActividadSeleccionada && ActividadSeleccionada.proyecto}/>
      <br />
      <TextField name="horas_planeado" className={styles.inputMaterial} label="Horas estimadas de duración" onChange={handleChange} value={ActividadSeleccionada && ActividadSeleccionada.horas_planeado}/>
      <br />
      <TextField name="fecha_inicio" className={styles.inputMaterial} label="Fecha de inicio" onChange={handleChange} value={ActividadSeleccionada && ActividadSeleccionada.fecha_inicio}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPostEditar()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que desea eliminar la actividad <b>{ActividadSeleccionada && ActividadSeleccionada.descripcion}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionPostEliminar()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (
    <div className="App">
      <br />
    <h3>Gestión de Actividades</h3>  
    <Button type="button" class="btn btn-primary" onClick={()=>abrirCerrarModalInsertar()}>Crear Actividad</Button>{"   "} 
    <Link to="/CrudProyectos" className="btn btn-primary">Ir a Proyectos</Link> {"   "} 
    <Link to="/OpcionesLider" className="btn btn-primary">Ir a opciones Usuario Lider</Link> {"   "} <br />
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
                 <Edit className={styles.iconos} onClick={()=>seleccionarActividad(actividad, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarActividad(actividad, 'Eliminar')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
     <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>

     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>

     <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal>
    </div>
  );
}

export default TablaActividades;
