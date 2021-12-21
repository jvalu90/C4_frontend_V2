import React, { Component } from 'react';
import './css/Login.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
const {genSalt, hash, compare}=require('bcryptjs');

const baseUrl="http://localhost:9000/users/data";
const cookies = new Cookies();

class FormLogin extends Component {
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }


    iniciarSesion=async()=>{
        console.log("Encriptando Contraseña");
        //BCRYPT_ROUNDS=5
        const salt=await genSalt(5);
        const contrasena_encriptada=await hash(this.state.form.password,salt);
        console.log("Contraseña encriptada");
        //await axios.get(baseUrl, {params: {username: this.state.form.username, password: contrasena_encriptada}})
        await axios.get("http://localhost:9000/users/datos_usuario_logueado", {params: {usuario: this.state.form.username}})
        .then(response=>{
            console.log("Obtuve la data del usuario");
            console.log(response.data);
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set('usuario', respuesta.usuario);
                cookies.set('nombres', respuesta.nombres);
                cookies.set('rol', respuesta.rol);

                alert(`Bienvenido ${respuesta.nombres}`);

                if (respuesta.rol==="Lider"){
                    window.location.href="./OpcionesLider";
                }
                else if (respuesta.rol==="SubAlterno"){
                    window.location.href="./OpcionesSubalterno";
                }
                else {
                window.location.href="./OpcionesAdministrador";    
                }
            }else{
                alert('El usuario o la contraseña no son correctos');
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }

    render() {
        return (
            <div align="center">
    <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
      </div>
        );
    }
}

export default FormLogin;