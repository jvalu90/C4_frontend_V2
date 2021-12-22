import React, { Component } from 'react';
import './css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const usuario=cookies.get('usuario');
const nombre_usuario=cookies.get('nombres');
const rol_usuario=cookies.get('rol');
const {genSalt, hash, compare}=require('bcryptjs');

class FormDatosCuenta extends Component {
    state={
        form:{
            usernick_anterior: '',
            password_anterior: '',
            password_nuevo_1: '',
            password_nuevo_2: ''
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

    actualizar=async()=>{
        // Realizo Logueo
        let data = JSON.stringify({
            usuario: this.state.form.usernick_anterior,
            contrasena: this.state.form.password_anterior
          });
        console.log(data);
        
        try{
            const response_previo = await axios.post("http://localhost:9000/users/login/",data,{headers:{"Content-Type" : "application/json"}});
            console.log("Devolviendo la respuesta");
            if(response_previo.data.token.length>0){

                if(String(this.state.form.password_nuevo_1)===String(this.state.form.password_nuevo_2)){

                  console.log("Encriptando Contraseña");
                  const salt=await genSalt(5);
                  const contrasena_encriptada=await hash(this.state.form.password_nuevo_1,salt);

                    let data1 = JSON.stringify({
                        usuario: this.state.form.usernick_anterior,
                        contrasena: contrasena_encriptada,
                        nombres: nombre_usuario,
                        rol: rol_usuario
                      });
                    console.log(data1);

                    const response = axios.post('http://localhost:9000/users/actualiza_datos_usuario/',data1,{headers:{"Content-Type" : "application/json"}});

                    alert('Datos del usuario actualizados');
                    window.location.href="./Login";
                }
                else{
                    alert('Contraseñas nuevas no coinciden'); 
                }

            } 
            else{
                alert('No se pueden modificar los datos. El usuario o la contraseña actuales no son correctos');
            }
        }
        catch(e){
            alert('No se pueden modificar los datos. El usuario o la contraseña actuales no son correctos');
            console.log(e);
        }       
    }

    render() {
        return (

        <div align="center">
        <h3>Modificar datos del usuario  {nombre_usuario}</h3>   
        <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">

          <label>Digite Usuario Actual: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="usernick_anterior"
              onChange={this.handleChange}
            />
            <br />

           <label>Digite Contraseña Actual: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password_anterior"
              onChange={this.handleChange}
            />
            <br />
            
            <h5>Información a modificar</h5> 
            
            <label>Digite Nueva Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password_nuevo_1"
              onChange={this.handleChange}
            />
            <br />
            <label>Digite Nueva Contraseña otra vez: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password_nuevo_2"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=> this.actualizar()}>Actualizar datos</button>
          </div>
        </div>
      </div>
      </div>
        );
    }
}

export default FormDatosCuenta;