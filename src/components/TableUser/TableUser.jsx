import { Table } from "react-bootstrap";

export default function TableUser({ usuarios }) {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.displayName}</td>
                        <td>{usuario.email}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}