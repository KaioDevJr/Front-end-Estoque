
import { Container } from "react-bootstrap";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import "./home.css";
import { Link } from "react-router-dom";
import { use, useEffect, useState } from "react";



export default function Home() {

    const[timer, setTimer] = useState(new Date().toLocaleTimeString());
    

    useEffect(() => {
        console.log("Componetente inicializado");
        const intervalId = setInterval(() => {
            const timeCurrent = new Date().toLocaleTimeString('pt-BR', { hour12: false });
            setTimer(timeCurrent);
        }, 1000);

        return () => {
            clearInterval(intervalId);
            console.log("Componente finalizado.");
        }
    }, []);


    return (
        <>
            <Header />
            <Container className='my-5'>
                <h1>Página Inicial</h1>
                <Link to="/produtos">Acesse a página de produtos</Link>
            </Container>
            <Container className="my-5"> 
                <p>{timer}</p>        
            </Container>
            <Footer />
        </>
    );
}
