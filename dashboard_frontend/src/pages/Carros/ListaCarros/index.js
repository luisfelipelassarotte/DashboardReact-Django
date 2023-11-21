import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import './listaCarros.css';

function ListaCarros() {

    const baseURL = "http://127.0.0.1:8000/carros/";
    const [carro, setCarro] = useState([]);
    const navigate = useNavigate();
    const handleEdit = (carroId) => {
        navigate(`/carros_editar/${carroId}`);
    }

    const handleDelete = async (carroId) => {
        try {
            if (!carroId) {
                console.error('ID do carro inválido');
                return;
            }

            await fetch(`${baseURL}${carroId}/`, {
                method: 'DELETE',
            });

            setCarro(carro.filter(car => car.id !== carroId));
        } catch (error) {
            console.error('Erro ao excluir carro:', error);
        }
    }



    useEffect(() => {
        load();
    }, []);

    async function load() {
        await fetch(`${baseURL}`, {
            method: 'GET',
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data)
                setCarro(data);
            })
            .catch(err => {
                console.log(err);
            });
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

    function renderDisponivel(disponivel) {
        if (disponivel) {
            return <span>✔️</span>;
        } else {
            return <span style={{ color: 'red' }}>❌</span>;
        }
    }


    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Foto</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Ano</th>
                    <th>Tipo de Combustivel</th>
                    <th>Preço Minimo</th>
                    <th>Disponivel</th>
                    <th>
                        <Link to={`/carros_adicionar/`}>
                            <button className='ButtonEditar'><p>Adicionar</p></button>
                        </Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                {carro.map((data, index) => (
                    <tr key={index}>
                        <td>{data.id}</td>
                        <td>{renderPhoto(data.foto)}</td>
                        <td>{data.marca}</td>
                        <td>{data.modelo}</td>
                        <td>{data.ano}</td>
                        <td>{data.combustivel}</td>
                        <td>R$ {data.preco_minimo}</td>
                        <td>{renderDisponivel(data.disponivel)}</td>
                        <td>
                            <Link to={`/carros_editar/${data.id}`}>
                                <button className='ButtonEditar'><p>Editar</p></button>
                            </Link>
                            <button className='ButtonDeletar' onClick={() => handleDelete(data.id)}>
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

export default ListaCarros;
