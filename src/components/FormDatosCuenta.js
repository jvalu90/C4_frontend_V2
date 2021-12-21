import {Link } from "react-router-dom";
function FormDatosCuenta() {
    return (
          <div className="container">
            <form>
                <div class="row">
                    <div class="row" id = "encabezado">
                        <h1 class="text-center">Modificar Datos de la Cuenta</h1>
                    </div>   

                    <div class="row">
                        <div class="col"><label>Usuario</label></div>
                        <div class="col"><input type="text" name="usuario" placeholder="Digite Usuario" ></input></div>
                    </div>

                    <div class="row">
                        <div class="col"><label></label></div>
                    </div>


                    <div class="row">
                        <div class="col"><label>Nombres</label></div>
                        <div class="col"><input type="text" name="nombre" placeholder="Digite Nombres del Usuario" ></input></div>
                    </div>

                    <div class="row">
                        <div class="col"><label></label></div>
                    </div>


                    <div class="row">
                        <div class="col"><label>Contraseña</label></div>
                        <div class="col"><input type="password" name="password" placeholder="Digite Contraseña" ></input></div>
                    </div>
                    
                    <div class="row">
                        <div class="col"><label></label></div>
                    </div>


                    <div class="row">
                        <div class="col"><label>Digite de nuevo la Contraseña</label></div>
                        <div class="col"><input type="password" name="password" placeholder="Confirme Contraseña" ></input></div>
                    </div>
                    
                    <div class="row">
                        <div class="col"><label></label></div>
                    </div>

                    <div class="row">
                        <div class="col" align="center" className="btn-group" >
                            <Link to="/Login" className="btn btn-primary">Modificar</Link>
                        </div> 
                    </div>
                </div>
            </form>
          </div>  
    );
}
export default FormDatosCuenta;