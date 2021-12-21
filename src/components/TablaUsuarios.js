/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import {Link } from "react-router-dom";
//npm install bcrypt
//npm install aws-sdk
// npm install bcryptjs
const {genSalt, hash, compare}=require('bcryptjs');

const baseUrl='http://localhost:9000/users/data'

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

function TablaUsuarios() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [UsuarioSeleccionado, setUsuarioSeleccionado]=useState({
    _id: '',
    usuario: '',
    nombres:'',
    contrasena: '',
    rol: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setUsuarioSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(UsuarioSeleccionado);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      console.log(response.data);
      setData(response.data);
    })
  }

  const peticionPostInsertar=async()=>{
    console.log(UsuarioSeleccionado);

    console.log("Encriptando Contraseña");
    //BCRYPT_ROUNDS=5
    const salt=await genSalt(5);
    const contrasena_encriptada=await hash(UsuarioSeleccionado.usuario,salt);

    let data = JSON.stringify({
      usuario: UsuarioSeleccionado.usuario,
      nombres: UsuarioSeleccionado.nombres,
      contrasena: contrasena_encriptada,
      rol: UsuarioSeleccionado.rol
    });

    const response = axios.post('http://localhost:9000/users/new/',data,{headers:{"Content-Type" : "application/json"}});
    abrirCerrarModalInsertar();
    peticionGet();
    //window.location.reload();
  }

  const peticionPostEditar=async()=>{
    console.log(UsuarioSeleccionado);

    console.log("Encriptando Contraseña");
    //BCRYPT_ROUNDS=5
    const salt=await genSalt(5);
    const contrasena_encriptada=await hash(UsuarioSeleccionado.usuario,salt);
    console.log(contrasena_encriptada);

    let data = JSON.stringify({
      _id: UsuarioSeleccionado._id,
      usuario: UsuarioSeleccionado.usuario,
      nombres: UsuarioSeleccionado.nombres,
      contrasena: contrasena_encriptada,
      rol: UsuarioSeleccionado.rol
    });
    console.log("Leyendo contraseña de la data");
    console.log(data);
    const response = axios.post('http://localhost:9000/users/update/',data,{headers:{"Content-Type" : "application/json"}});
    abrirCerrarModalEditar();
    peticionGet();
  }


  const peticionPostEliminar=async()=>{
    console.log(UsuarioSeleccionado);
    let data = JSON.stringify({
      _id: UsuarioSeleccionado._id,
      usuario: UsuarioSeleccionado.usuario
    });
    const nombre_usuario= UsuarioSeleccionado.usuario;
    const response = axios.post('http://localhost:9000/users/delete?usuario='+nombre_usuario,data,{headers:{"Content-Type" : "application/json"}});
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

  const seleccionarUsuario=(usuario, caso)=>{
    setUsuarioSeleccionado(usuario);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async()=>{
    await peticionGet();
  },[])


  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Usuario</h3>
      <TextField name="usuario" className={styles.inputMaterial} label="Nick del Usuario" onChange={handleChange}/>
      <br />
      <TextField name="nombres" className={styles.inputMaterial} label="Nombres del Usuario" onChange={handleChange}/>
      <br />
      <TextField name="rol" className={styles.inputMaterial} label="Rol Asignado" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPostInsertar()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Usuario</h3>
      <TextField name="usuario" className={styles.inputMaterial} label="Nick del Usuario" onChange={handleChange} value={UsuarioSeleccionado && UsuarioSeleccionado.usuario}/>
      <br />
      <TextField name="nombres" className={styles.inputMaterial} label="Nombres del Usuario" onChange={handleChange} value={UsuarioSeleccionado && UsuarioSeleccionado.nombres}/>
      <br />
      <TextField name="rol" className={styles.inputMaterial} label="Rol Asignado" onChange={handleChange} value={UsuarioSeleccionado && UsuarioSeleccionado.rol}/>
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPostEditar()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que desea eliminar el usuario <b>{UsuarioSeleccionado && UsuarioSeleccionado.usuario}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionPostEliminar()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (
    <div className="App">
      <br />
    <h3>Gestión de Usuarios</h3>  
    <Button type="button" class="btn btn-primary" onClick={()=>abrirCerrarModalInsertar()}>Crear Usuario</Button>{"   "} 
    <Link to="/OpcionesAdministrador" className="btn btn-primary">Ir a opciones Usuario Administrador</Link> {"   "} <br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Usuario</TableCell>
             <TableCell>Nombres</TableCell>
             <TableCell>Rol</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(usuario=>(
             <TableRow key={usuario._id}>
               <TableCell>{usuario.usuario}</TableCell>
               <TableCell>{usuario.nombres}</TableCell>
               <TableCell>{usuario.rol}</TableCell>
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarUsuario(usuario, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarUsuario(usuario, 'Eliminar')}/>
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

export default TablaUsuarios;
