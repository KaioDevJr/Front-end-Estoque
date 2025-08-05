import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import "./produtos.css";
import { useEffect, useState } from "react";
import TableProd from "../../components/TableProd/TableProd";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const nomeValid = {
    required: {
        value: true,
        message: "Preencha o nome do produto."
    },
    maxLength: {
        value: 20,
        message: "O nome do produto deve ter no máximo 20 caracteres."
    }
};
const quantValid = {
    required: {
        value: true,
        message: "Preencha a quantidade de produtos."
    },
    min: {
        value: 1,
        message: "Quantidade mínima de 1."
    },
    valueAsNumber: true
};
const precoValid = {
    required: {
        value: true,
        message: "Preencha o preço do produto."
    },
    min: {
        value: 0.0001,
        message: "O preço do produto não pode ser menor ou igual a 0.",
    },
    valueAsNumber: true
};

export default function Products() {
    const [produtos, setProdutos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();


    
    async function onSubmit(dados) {
        setIsLoading(true);
        try {
            // 1. Cadastra o novo produto no backend.
            await api.post("/produtos", dados);

            // 2. Aciona o gatilho para que o useEffect busque os produtos novamente.
            setUpdateTrigger(currentValue => currentValue + 1);
            reset();
            // window.alert("Produto cadastrado com sucesso!");
        } catch (error) {
            window.alert("Erro ao cadastrar produto. Tente novamente.");
            // Log detalhado do erro para facilitar a depuração
            if (error.response) {
                // O servidor respondeu com um status de erro (4xx, 5xx)
                console.error("Erro de resposta da API:", error.response.data);
                console.error("Status do erro:", error.response.status);
                console.error("Cabeçalhos:", error.response.headers);
            } else if (error.request) {
                // A requisição foi feita mas não houve resposta
                console.error("A requisição foi enviada, mas sem resposta do servidor:", error.request);
            } else {
                // Algo aconteceu ao configurar a requisição
                console.error("Erro ao configurar a requisição:", error.message);
            }
            console.error("Configuração da requisição que falhou:", error.config);
        } finally {
            setIsLoading(false);
        }
    }

    async function buscarProdutos() {
        try {
            const response = await api.get("/produtos");
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    }
    useEffect(() => {
        buscarProdutos();
        // O useEffect é acionado sempre que o updateTrigger muda,
    }, [updateTrigger]);

    useEffect(() => {
        // Este é o local correto para executar efeitos colaterais como a navegação.
        // Se o usuário não estiver autenticado, ele será redirecionado para o login.
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        // Enquanto a navegação ocorre, retornamos null para não renderizar o resto do componente.
        return null;
    }

    return (
        <>
            <Header />

            <Container className="my-5">
                <h1>Produtos</h1>

                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="nome" >
                            <Form.Label>Nome do Produto</Form.Label>
                            <Form.Control type="text" isInvalid={!!errors.nome} {...register("nome", nomeValid)} />
                            <Form.Control.Feedback type="invalid">
                                {errors.nome?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="quantidade">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control type="number" isInvalid={!!errors.quantidade} {...register("quantidade", quantValid)} />
                            <Form.Control.Feedback type="invalid">
                                {errors.quantidade?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="preco">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control type="number" step="any" isInvalid={!!errors.preco} {...register("preco", precoValid)} />
                            <Form.Control.Feedback type="invalid">
                                {errors.preco?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        ) : (
                            "Cadastrar"
                        )}
                    </Button>
                </Form>
            </Container>

            <Container className='my-5'>
                <h2>Lista de Produtos</h2>

                {Array.isArray(produtos) && produtos.length > 0 ? (
                    <TableProd produtos={produtos} />
                ) : (
                    <p>Não há produtos no estoque.</p>
                )}
        
            </Container>
            <Footer />
            </>
    );
    }