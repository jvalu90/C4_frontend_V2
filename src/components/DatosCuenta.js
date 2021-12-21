import Footer from './Footer';
import FormDatosCuenta from './FormDatosCuenta';
import Cabecera from './Cabecera';
import 'bootstrap/dist/css/bootstrap.min.css';

function DatosCuenta() {
  return (
    <div>
      <Cabecera/>
      <FormDatosCuenta/> 
      <Footer/>
    </div>

  );
}

export default DatosCuenta;