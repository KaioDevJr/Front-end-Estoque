import { Container, Navbar } from "react-bootstrap";

import "./Footer.css";


export default function Footer() {

    return (
        
        <footer>

            <Navbar bg="dark" data-bs-theme="dark">

                <Container>

                    <Navbar.Brand href="#home">Blidi App Todos os direitos reservados.</Navbar.Brand>

                </Container>

            </Navbar>

        </footer>

    );

}

