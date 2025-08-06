import { Table } from "react-bootstrap";

export default function TableProd({ produtos }) {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                </tr>
            </thead>
            <tbody>
                {produtos.map((produto) => (
                    // Corrigido para usar `produto._id`, que é o nome do campo que vem do banco de dados.
                    <tr key={produto.id}>
                        <td>{produto.id}</td>
                        <td>{produto.nome}</td>
                        <td>{produto.quantidade}</td>
                        <td>R$ {(produto.preco ?? 0).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}