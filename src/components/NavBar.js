import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import {Link } from "react-router-dom";
const NavBar = function ({ onOptionClicked }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <div className="btn-group">
                                <Link to="/Principal" className="btn btn-dark">Home</Link>
                        </div>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <div className="btn-group">
                                <Link to="/Login" className="btn btn-dark">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;