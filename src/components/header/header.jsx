import { Button } from "react-bootstrap";
import "./Header.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Header(props) {
    const { isAuthenticated,logout } = useAuth();
    
    return (
        
        <header>
        
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                <Navbar.Brand as={Link} to= "/">Blidi APP</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to= "/">Home</Nav.Link>
                        <Nav.Link as={Link} to= "/produtos">Produtos</Nav.Link>
                        <Nav.Link as={Link} to= "/usuarios">Usuários</Nav.Link>
                        <Nav.Link as={Link} to= "/clientes">Clientes</Nav.Link>
                        {isAuthenticated ? (<Nav.Link as={Button} onClick={logout}>Sair</Nav.Link>)
                        : (<Nav.Link as={Link} to= "/login">Login</Nav.Link>)
                        }

                    </Nav>
                </Container>
            </Navbar>          
    
            {/* </> */}
        </header>
      
       
    );
}