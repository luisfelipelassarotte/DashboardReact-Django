import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import './listaVendedor.css';

function ListaVendedores() {
    const baseURL = "http://127.0.0.1:8000/vendedores/";
    const [vendedor, setVendedor] = useState([]);
    const navigate = useNavigate();

    const handleEdit = (vendedorId) => {
        navigate(`/vendedor_editar/${vendedorId}`);
    }

    function renderPhoto(photo) {
        const baseUrl = 'http://127.0.0.1:8000/';

        if (photo) {
            const photoUrl = `${baseUrl}${photo}`;
            return <img src={photoUrl} alt="Foto do carro" />;
        } else {
            return <span>Foto Indisponível</span>;
        }
    }

    const handleDelete = async (vendedorId) => {
        try {
            if (!vendedorId) {
                console.error('ID do vendedor inválido');
                return;
            }

            await fetch(`${baseURL}${vendedorId}/`, {
                method: 'DELETE',
            });

            setVendedor(vendedor.filter(user => user.id !== vendedorId));
        } catch (error) {
            console.error('Erro ao excluir vendedor:', error);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function load() {
        try {
            const response = await fetch(baseURL);
            const data = await response.json();
            setVendedor(data);
        } catch (error) {
            console.error('Erro ao carregar vendedors:', error);
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Total de Vendas</th>
                        <th>
                            <Link to={`/vendedor_adicionar/`}>
                                <button className='ButtonEditar'><p>Adicionar</p></button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {vendedor.map((vendedor, index) => (
                        <tr key={index}>
                            <td>{vendedor.id}</td>
                            <td>{vendedor.username}</td>
                            <td>{vendedor.telefone}</td>
                            <td>{vendedor.endereco}</td>
                            <td>{vendedor.total_vendas}</td>
                            <td>
                                <Link to={`/vendedor_editar/${vendedor.id}`}>
                                    <button className='ButtonEditar'><p>Editar</p></button>
                                </Link>
                                <button className='ButtonDeletar' onClick={() => handleDelete(vendedor.pk)}>
                                    <p>Deletar</p>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default ListaVendedores;

