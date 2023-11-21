import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './editar.css';

function Editar() {
    const currentYear = new Date().getFullYear();
    const baseURL = "http://127.0.0.1:8000/vendas/";
    const { vendaId } = useParams();
    const [vendaData, setVendaData] = useState({});
    const [responsaveis, setResponsaveis] = useState([]);
    const [carros, setCarros] = useState([]);
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setVendaData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    useEffect(() => {
        loadVendaData();
        fetchResponsaveisData();
        fetchCarrosData();
    }, [vendaId]);

    async function fetchResponsaveisData() {
        try {
            const response = await fetch('http://127.0.0.1:8000/vendedores/'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch responsaveis data');
            }
            const data = await response.json();
            setResponsaveis(data); // Update responsaveis state with fetched data
        } catch (error) {
            console.error('Erro ao carregar responsaveis:', error);
        }
    }

    async function fetchCarrosData() {
        try {
            const response = await fetch('http://127.0.0.1:8000/carros/'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch carros data');
            }
            const data = await response.json();
            setCarros(data); // Update carros state with fetched data
        } catch (error) {
            console.error('Erro ao carregar carros:', error);
        }
    }

    async function loadVendaData() {
        try {
            const response = await fetch(`${baseURL}${vendaId}/`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch venda data');
            }
            const data = await response.json();
            setVendaData(data);
        } catch (err) {
            console.error('Erro ao carregar dados do venda:', err);
        }
    }

    async function handleUpdate(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${baseURL}${vendaId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vendaData), // Include updated data in the request body
            });

            if (!response.ok) {
                throw new Error('Failed to update venda data');
            }
            navigate('/venda_list');
        } catch (err) {
            console.error('Erro ao atualizar venda:', err);
        }
    }


    function handleChange(event) {
        const { name, value, files } = event.target;

        if (files && files[0]) {
            setVendaData({ ...vendaData, [name]: files[0] });
        } else {
            setVendaData({ ...vendaData, [name]: value });
        }
    }

    return (
        <div className="editar-container">
            <h2>Editar Venda</h2>

            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label htmlFor="responsavel">Responsável:</label>
                    <select
                        id="responsavel"
                        name="responsavel"
                        value={vendaData.responsavel}
                        onChange={handleChange}
                        required
                    >
                        <option key="" value="">Selecione o responsável</option>
                        {responsaveis.map((resp) => (
                            <option key={resp.id} value={String(resp.id)}>
                                {resp.username}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="carro">Carro:</label>
                    <select
                        id="carro"
                        name="carro"
                        value={vendaData.carro}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione o carro</option>
                        {carros.map((car) => (
                            <option key={car.id} value={car.id}>
                                {car.marca} - {car.modelo} - {car.ano}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="Endereco">Endereço:</label>
                    <input
                        type="text"
                        id="Endereco"
                        name="endereco"
                        value={vendaData.endereco || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Preco">Preço da Venda:</label>
                    <input
                        type="number"
                        id="Preco"
                        name="preco"
                        value={vendaData.preco || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="DataVenda">Data da Venda:</label>
                    <input
                        type="date"
                        id="DataVenda"
                        name="data_venda"
                        value={vendaData.data_venda || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Entregue">Entregue:</label>
                    <input
                        type="checkbox"
                        id="Entregue"
                        name="entregue"
                        checked={vendaData.entregue}
                        onChange={handleCheckboxChange}
                    />
                </div>

                <button type="submit">Salvar</button>
            </form>
        </div>
    );

}

export default Editar;
