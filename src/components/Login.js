import FormLogin from './FormLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import Cabecera from './Cabecera';
function Login() {
  return (
    <div>
      <Cabecera/> 
      <FormLogin/> 
      <Footer/> 
    </div>

  );
}

export default Login;