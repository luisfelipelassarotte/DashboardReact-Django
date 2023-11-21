import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import './lista.scss';

function ListaVendas() {
    const baseURL = "http://127.0.0.1:8000/vendas/";
    const [venda, setVenda] = useState([]);
    const navigate = useNavigate();

    const handleEdit = (vendaId) => {
        navigate(`/venda_editar/${vendaId}`);
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

    const handleDelete = async (vendaId) => {
        try {
            if (!vendaId) {
                console.error('ID do venda inválido');
                return;
            }

            await fetch(`${baseURL}${vendaId}/`, {
                method: 'DELETE',
            });

            setVenda(venda.filter(user => user.id !== vendaId));
        } catch (error) {
            console.error('Erro ao excluir venda:', error);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function load() {
        try {
            const response = await fetch(baseURL);
            const data = await response.json();
            setVenda(data);
        } catch (error) {
            console.error('Erro ao carregar vendas:', error);
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Foto Carro</th>
                        <th>Username</th>
                        <th>Carro</th>
                        <th>Entregue</th>
                        <th>Endereço</th>
                        <th>Preço</th>
                        <th>Data da Venda</th>
                        <th>
                            <Link to={`/venda_adicionar/`}>
                                <button className='ButtonEditar'><p>Adicionar</p></button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {venda.map((venda, index) => (
                        <tr key={index}>
                            <td>{venda.pk}</td>
                            <td>{renderPhoto(venda.foto_carro)}</td>
                            <td>{venda.username}</td>
                            <td>{venda.marca} - {venda.modelo}</td>
                            <td>{venda.entregue ? 'Sim' : 'Não'}</td>
                            <td>{venda.endereco}</td>
                            <td>R$ {venda.preco}</td>
                            <td>{venda.data_venda}</td>
                            <td>
                                <Link to={`/venda_editar/${venda.pk}`}>
                                    <button className='ButtonEditar'><p>Editar</p></button>
                                </Link>
                                <button className='ButtonDeletar' onClick={() => handleDelete(venda.pk)}>
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

export default ListaVendas;

