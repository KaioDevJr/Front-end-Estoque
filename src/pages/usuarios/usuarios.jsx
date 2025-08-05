import './usuarios.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import TableUser from '../../components/TableUser/TableUser';

// 1. Regras de validação para os campos do usuário
const nomeValid = {
    required: {
        value: true,
        message: "O nome do usuário é obrigatório."
    },
    maxLength: {
        value: 50,
        message: "O nome deve ter no máximo 50 caracteres."
    }
};

const emailValid = {
    required: {
        value: true,
        message: "O email é obrigatório."
    },
    pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Email inválido."
    }
};

const senhaValid = {
    required: {
        value: true,
        message: "A senha é obrigatória."
    },
    minLength: {
        value: 6,
        message: "A senha deve ter no mínimo 6 caracteres."
    }
};

export default function Usuarios(){
    // 2. Estados para controlar a lista de usuários, carregamento e o gatilho de atualização
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // 3. Função para buscar os usuários da API
    async function buscarUsuarios() {
        try {
            const response = await api.get("/usuarios");
            setUsuarios(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    }

    // 4. Função para lidar com o envio do formulário de cadastro
    async function onSubmit(dados) {
        setIsLoading(true);
        try {
            // Mapeamos os dados do formulário para o formato esperado pela API.
            const dadosParaApi = {
                displayName: dados.nome,
                email: dados.email,
                password: dados.senha
            };
            await api.post("/usuarios", dadosParaApi);
            setUpdateTrigger(current => current + 1); // Aciona o gatilho
            reset();
            window.alert("Usuário cadastrado com sucesso!");
        } catch (error) {
            // Melhoramos o tratamento de erro para dar um feedback mais específico ao usuário.
            // A API deve retornar uma mensagem de erro no corpo da resposta (ex: error.response.data.message).
            const errorMessage = error.response?.data?.message || "Erro ao cadastrar usuário. Tente novamente.";
            window.alert(errorMessage);

            // Log detalhado para depuração no console
            if (error.response) {
                console.error("Erro de resposta da API:", error.response.data);
                console.error("Status do erro:", error.response.status);
            }
        } finally {
            setIsLoading(false);
        }
    }

    // 5. useEffect para buscar os usuários quando o componente montar e quando o gatilho for acionado
    useEffect(() => {
        buscarUsuarios();
    }, [updateTrigger]);

    return(
        <>
            <Header/>
            <Container className='my-5'>
                <h1>Cadastro de Usuários</h1>

                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="nome">
                            <Form.Label>Nome do Usuário</Form.Label>
                            <Form.Control type="text" isInvalid={!!errors.nome} {...register("nome", nomeValid)} />
                            <Form.Control.Feedback type="invalid">{errors.nome?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" isInvalid={!!errors.email} {...register("email", emailValid)} />
                            <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="senha">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" isInvalid={!!errors.senha} {...register("senha", senhaValid)} />
                            <Form.Control.Feedback type="invalid">{errors.senha?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Cadastrar"}
                    </Button>
                </Form>
            </Container>

            <Container className='my-5'>
                <h2>Lista de Usuários</h2>
                {Array.isArray(usuarios) && usuarios.length > 0 ? <TableUser usuarios={usuarios} /> : <p>Nenhum usuário cadastrado.</p>}
            </Container>
            <Footer />
            </>
    )
}