import React, {useState, useEffect} from 'react';
import './adicionar.css';
import { useNavigate } from 'react-router-dom';

function AdicionarVendas() {
    const baseURL = 'http://127.0.0.1:8000/vendas/';
    const carrosURL = 'http://127.0.0.1:8000/carros';
    const vendedoresURL = 'http://127.0.0.1:8000/vendedores/';
    const [vendas, setVendas] = useState([]);
    const [newVenda, setNewVenda] = useState({
        entregue: false,
    });
    const [carros, setCarros] = useState([]);
    const [responsaveis, setResponsaveis] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadVendas();
        loadCarros();
        loadResponsaveis();
    }, []);

    async function loadVendas() {
        try {
            const response = await fetch(`${baseURL}`);
            const data = await response.json();
            setVendas(data);
        } catch (error) {
            console.error('Erro ao carregar vendas:', error);
        }
    }

    async function loadCarros() {
        try {
            const response = await fetch(carrosURL);
            const data = await response.json();
            const carrosDisponiveis = data.filter((carro) => carro.disponivel);
            setCarros(carrosDisponiveis);
        } catch (error) {
            console.error('Erro ao carregar carros:', error);
        }
    }

    async function loadResponsaveis() {
        try {
            const response = await fetch(vendedoresURL);
            const data = await response.json();
            setResponsaveis(data);
        } catch (error) {
            console.error('Erro ao carregar responsáveis:', error);
        }
    }


    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('foto', newVenda.foto);

        for (const key in newVenda) {
            if (key !== 'foto') {
                formData.append(key, newVenda[key]);
            }
        }

        try {
            const response = await fetch(`${baseURL}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            setVendas([...vendas, data]);
            setNewVenda({});
            console.log(setNewVenda())
            navigate('/venda_list');
        } catch (error) {
            console.error('Erro ao adicionar venda:', error);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;

        if (name === 'responsavel') {
            setNewVenda({ ...newVenda, [name]: value });
        } else {
            setNewVenda({ ...newVenda, [name]: value });
        }
    }



    return (
        <div className="adicionar-container">
            <h2>Adicionar Vendas</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="responsavel">Responsável:</label>
                    <select
                        id="responsavel"
                        name="responsavel"
                        value={newVenda.responsavel}
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
                        value={newVenda.carro}
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
                        value={newVenda.endereco || ''}
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
                        value={newVenda.preco || ''}
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
                        value={newVenda.data_venda || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default AdicionarVendas;
