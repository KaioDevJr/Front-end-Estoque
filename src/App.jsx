import './app.css';
import Home from './pages/home/home';
import Products from './pages/products/produtos';
import Usuarios from './pages/usuarios/usuarios';
import Login from './pages/login/login';
import { AuthProvider } from './context/AuthContext';
// import Clientes from './pages/clientes/clientes';



import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
    return (
      <AuthProvider>

        <BrowserRouter>
            <Routes>  
              <Route path='/' element={<Home/>} />
              <Route path='/produtos' element={<Products/>} />
              <Route path='/usuarios' element={<Usuarios/>} />
              <Route path='/login' element={<Login/>} />
              {/* <Route path='/clientes' element={<Clientes/>} /> */}
             
              <Route path='*' element= {<h1>404 - Página não encontrada!</h1> }/>
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    );
}