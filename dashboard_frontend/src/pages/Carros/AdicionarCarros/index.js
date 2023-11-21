import React, {useState, useEffect} from 'react';
import './adicionar.css';
import { useNavigate } from 'react-router-dom';
function AdicionarCarros() {
    const currentYear = new Date().getFullYear();
    const baseURL = "http://127.0.0.1:8000/carros/";
    const [carros, setCarros] = useState([]);
    const [newCarro, setNewCarro] = useState({
        ano: new Date().getFullYear().toString(),
        disponivel: true,
        foto: null,
        },
    );
    const navigate = useNavigate();


    useEffect(() => {
        load();
    }, []);

    async function load() {
        await fetch(`${baseURL}`, {
            method: 'GET',
        })
            .then(data => data.json())
            .then(data => {
                setCarros(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('foto', newCarro.foto); // Adiciona a foto ao FormData

        // Adiciona outras informações do carro ao FormData
        for (const key in newCarro) {
            if (key !== 'foto') {
                formData.append(key, newCarro[key]);
            }
        }

        try {
            const response = await fetch(`${baseURL}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            setCarros([...carros, data]);
            setNewCarro({ ano: new Date().getFullYear().toString(), foto: null });
            navigate('/carros_list');
        } catch (error) {
            console.error('Erro ao adicionar carro:', error);
        }
    }

    function handleChange(event) {
        if (event.target.name === 'foto') {
            setNewCarro({ ...newCarro, foto: event.target.files[0] });
        } else {
            const { name, value } = event.target;
            setNewCarro({ ...newCarro, [name]: value });
        }
    }

    return (
        <div className="adicionar-container">
            <h2>Adicionar Carros</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Foto</label>
                    <div className="name-container">
                        <input
                            type="file"
                            name="foto"
                            onChange={handleChange}
                            accept="image/*"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="Marca">Marca:</label>
                    <input
                        type="text"
                        id="Marca"
                        name="marca"
                        value={newCarro.marca || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Modelo">Modelo:</label>
                    <input
                        type="text"
                        id="Modelo"
                        name="modelo"
                        value={newCarro.modelo || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Ano">Ano:</label>
                    <input
                        type="number"
                        id="Ano"
                        name="ano"
                        value={newCarro.ano || ''}
                        onChange={handleChange}
                        min="1990"
                        max={currentYear}
                        placeholder={`Entre 1900 e ${currentYear}`}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Combustivel">Tipo de Combustivel:</label>
                    <select
                        id="Combustivel"
                        name="combustivel"
                        value={newCarro.combustivel}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione o tipo de combustível</option>
                        <option value="Gasolina">Gasolina</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Flex">Flex</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="Preco">Preço Minimo:</label>
                    <input
                        type="number"
                        id="Preco"
                        name="preco_minimo"
                        value={newCarro.preco_minimo || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default AdicionarCarros;
