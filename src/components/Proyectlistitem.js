function Proyeclistitem() {
    return (
        <div className="container">
            <div className="card mb-4 mt-4 col-md-12">
                <div className="card-body">
                    <h2 className="card-title text-center">Reto Ciclo 4</h2>
                    <p className="card-text text-justify">
                        <br></br>Santa Monica Studio es una empresa de desarrollo, la cual no tiene de una forma organizada con la que realizar sus proyectos. Por lo que Santa Monica Studio lo contacta a usted y su equipo para tercerizar el desarrollo de una plataforma de gestión de proyectos, puesto que en el momento no disponen de los recursos humanos para realizar dicha plataforma. Se debe tener en cuenta que un empleado puede estar asignado a varios proyectos.
                        <br></br>
                        <br></br>
                        Los tipos de usuarios que debe manejar el sistema son administrador, usuario líder y usuario subalterno.
                        <br></br>
                        <br></br>
                        Un usuario líder debe estar en la capacidad de:
                        <br></br>
                        <ul>
                        <li>Crear un proyecto. Se debe definir un título, una descripción y una fecha de inicio. La fecha final del proyecto es igual a la mayor fecha de finalización entre las actividades asignadas al proyecto.</li>

                        <li>Crear las actividades del proyecto, indicando el tiempo estimado de las mismas, la fecha de inicio y la fecha de finalización. La fecha de inicio de una actividad debe ser igual o superior a la fecha de inicio del proyecto. </li>

                        <li>Asignar usuarios subalternos a un proyecto.</li>
                        <li>Finalizar un proyecto.</li>
                        <li>Generar los siguientes informes:
                            <ul>
                                <li>Proyectos terminados.</li>
                                <li>Proyectos iniciados.</li>
                                
                                <li>Horas por proyecto.</li>
                                <ul>
                                <li>Sumatoria de horas definidas dentro de las actividades.</li>
                                
                                <li>Sumatoria de horas reportadas por los empleados.</li>
                                </ul>
                                <li>Horas por empleado y proyecto.</li>
                            </ul>
                        </li>
                        </ul>

                        El usuario subalterno deberá estar en la capacidad de:
                        <ul>
                            <li>Ver proyectos asignados.</li>
                            
                            <li>Ver actividades de un proyecto asignado.</li>
                            
                            <li>Cargar horas al desarrollo de una actividad de un proyecto.</li>
                            
                            <li>Marcar actividad como iniciada/completada.</li>
                        <br></br>
                        </ul>
                        <br></br>
                        <h4>Consideraciones:</h4>
                        <ul>
                            <li>El tiempo de una fase se calcula con base en los tiempos individuales de las actividades que la conforman.</li>
                            <li>El tiempo del proyecto es la suma del tiempo de desarrollo de las actividades.</li>
                            <li>Un administrador se encarga de gestionar los usuarios internos y además ejerce control total de la plataforma.</li>
                        </ul>

                        <br></br>
                        <h5>Notas: </h5>
                        Los datos suministrados por los usuarios deben cumplir la política de privacidad de datos vigente, es decir las contraseñas de los usuarios deben almacenarse de forma cifrada y la conexión al servidor debe realizarse de forma segura.
                        <br></br>
                        La base de datos debe ser no relacional.
                        <br></br>
                        Se debe utilizar una arquitectura desacoplada, es decir, una API back end y un front end que consuma dicha API.
                        <br></br>
                        La API back end debe estar desarrollada en Express.js
                        <br></br>
                        El front end debe estar desarrollado en React.js
                        <br></br>
                        Se debe utilizar Bootstrap como librería CSS  para manejar los estilos de su aplicación.
                        <br></br> 
                    </p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
       
    );

}
export default Proyeclistitem;