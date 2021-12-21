/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import {Link } from "react-router-dom";

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

function TablaProyectos() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [ProyectoSeleccionado, setProyectoSeleccionado]=useState({
    _id: '',
    nombre: '',
    descripcion:'',
    usuario_asignado: '',
    finalizado: '',
    fecha_inicio: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setProyectoSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(ProyectoSeleccionado);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      console.log(response.data);
      setData(response.data);
    })
  }

  const peticionPostInsertar=async()=>{
    console.log(ProyectoSeleccionado);
    let data = JSON.stringify({
      nombre: ProyectoSeleccionado.nombre,
      descripcion: ProyectoSeleccionado.descripcion,
      usuario_asignado: ProyectoSeleccionado.usuario_asignado,
      finalizado: "No",
      fecha_inicio: ProyectoSeleccionado.fecha_inicio
    });
    const response = axios.post('http://localhost:9000/projects/new/',data,{headers:{"Content-Type" : "application/json"}});
    abrirCerrarModalInsertar();
    peticionGet();
    //window.location.reload();
  }

  const peticionPostEditar=async()=>{
    console.log(ProyectoSeleccionado);
    let data = JSON.stringify({
      _id: ProyectoSeleccionado._id,
      nombre: ProyectoSeleccionado.nombre,
      descripcion: ProyectoSeleccionado.descripcion,
      usuario_asignado: ProyectoSeleccionado.usuario_asignado,
      finalizado: ProyectoSeleccionado.finalizado,
      fecha_inicio: ProyectoSeleccionado.fecha_inicio
    });
    const response = axios.post('http://localhost:9000/projects/update/',data,{headers:{"Content-Type" : "application/json"}});
    abrirCerrarModalEditar();
    peticionGet();
  }


  const peticionPostEliminar=async()=>{
    console.log(ProyectoSeleccionado);
    let data = JSON.stringify({
      _id: ProyectoSeleccionado._id,
      nombre: ProyectoSeleccionado.nombre
    });
    const nombre_proyecto= ProyectoSeleccionado.nombre;
    const response = axios.post('http://localhost:9000/projects/delete?nombre='+nombre_proyecto,data,{headers:{"Content-Type" : "application/json"}});
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

  const seleccionarProyecto=(proyecto, caso)=>{
    setProyectoSeleccionado(proyecto);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async()=>{
    await peticionGet();
  },[])


  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo proyecto</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre del proyecto" onChange={handleChange}/>
      <br />
      <TextField name="descripcion" className={styles.inputMaterial} label="Descripción del proyecto" onChange={handleChange}/>
      <br />
      <TextField name="usuario_asignado" className={styles.inputMaterial} label="Usuario Subalterno Asignado" onChange={handleChange}/>
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
      <h3>Editar Proyecto</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre del proyecto" onChange={handleChange} value={ProyectoSeleccionado && ProyectoSeleccionado.nombre}/>
      <br />
      <TextField name="descripcion" className={styles.inputMaterial} label="Descripción del proyecto" onChange={handleChange} value={ProyectoSeleccionado && ProyectoSeleccionado.descripcion}/>
      <br />
      <TextField name="usuario_asignado" className={styles.inputMaterial} label="Usuario Subalterno Asignado" onChange={handleChange} value={ProyectoSeleccionado && ProyectoSeleccionado.usuario_asignado}/>
      <br />
      <TextField name="finalizado" className={styles.inputMaterial} label="Finalizado?" onChange={handleChange} value={ProyectoSeleccionado && ProyectoSeleccionado.finalizado}/>
      <br />
      <TextField name="fecha_inicio" className={styles.inputMaterial} label="Fecha de inicio" onChange={handleChange} value={ProyectoSeleccionado && ProyectoSeleccionado.fecha_inicio}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPostEditar()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que desea eliminar el proyecto <b>{ProyectoSeleccionado && ProyectoSeleccionado.nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionPostEliminar()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (
    <div className="App">
      <br />
    <h3>Gestión de Proyectos</h3>  
    <Button type="button" class="btn btn-primary" onClick={()=>abrirCerrarModalInsertar()}>Crear Proyecto</Button>{"   "} 
    <Link to="/OpcionesLider" className="btn btn-primary">Ir a opciones Usuario Lider</Link> {"   "} <br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Nombre</TableCell>
             <TableCell>Descripcion</TableCell>
             <TableCell>SubAlterno asignado</TableCell>
             <TableCell>Finalizado</TableCell>
             <TableCell>Fecha de Inicio</TableCell>
             <TableCell>Acciones</TableCell>
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
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarProyecto(proyecto, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarProyecto(proyecto, 'Eliminar')}/>
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

export default TablaProyectos;
