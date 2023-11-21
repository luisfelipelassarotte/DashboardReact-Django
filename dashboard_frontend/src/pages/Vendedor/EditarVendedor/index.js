import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './editar.css';

function Editar() {
    const baseURL = "http://127.0.0.1:8000/vendedores/";
    const { vendedorId } = useParams();
    const navigate = useNavigate();
    const [vendedorData, setVendedorData] = useState({
        username: '',
        email: '',
        telefone: '',
        cpf: '',
        conta_bancaria: '',
        data_demissao: '',
        endereco: ''
    });

    useEffect(() => {
        loadVendedorData();
    }, [vendedorId]);

    async function loadVendedorData() {
        try {
            const response = await fetch(`${baseURL}${vendedorId}/`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch vendedor data');
            }
            const data = await response.json();
            setVendedorData(data);
        } catch (err) {
            console.error('Erro ao carregar dados do vendedor:', err);
        }
    }

    async function handleUpdate(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${baseURL}${vendedorId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vendedorData),
            });

            if (!response.ok) {
                throw new Error('Failed to update vendedor data');
            }
            navigate('/vendedor_list');
        } catch (err) {
            console.error('Erro ao atualizar vendedor:', err);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        let updatedValue = value;

        if (name === 'cpf') {
            updatedValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
            if (updatedValue.length > 11) {
                updatedValue = updatedValue.slice(0, 11); // Limita a 11 caracteres
            }
        } else if (name === 'telefone') {
            updatedValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
            if (updatedValue.length > 9) {
                updatedValue = updatedValue.slice(0, 9); // Limita a 9 caracteres
            }
            updatedValue = updatedValue.replace(/^(\d{5})(\d{4}).*/, '$1-$2'); // Formatação estética
        }

        setVendedorData({
            ...vendedorData,
            [name]: updatedValue,
        });
    };

    return (
        <div className="editar-container">
            <h2>Editar Vendedor</h2>

            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={vendedorData.username}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Email:
                        <input
                            type="text"
                            name="email"
                            value={vendedorData.email}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Telefone:
                        <input
                            type="text"
                            name="telefone"
                            value={vendedorData.telefone}
                            onChange={handleChange}
                            pattern="\d{5}-\d{4}"
                            title="Digite um número de telefone válido (99999-9999)"
                            maxLength="9"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        CPF:
                        <input
                            type="text"
                            name="cpf"
                            value={vendedorData.cpf}
                            onChange={handleChange}
                            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                            title="Digite um CPF válido (123.123.123-13)"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Conta Bancária:
                        <input
                            type="text"
                            name="conta_bancaria"
                            value={vendedorData.conta_bancaria}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Data de Demissão:
                        <input
                            type="date"
                            name="data_demissao"
                            value={vendedorData.data_demissao}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Endereço:
                        <input
                            type="text"
                            name="endereco"
                            value={vendedorData.endereco}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <button type="submit">Salvar</button>
            </form>
        </div>
    );

}

export default Editar;
