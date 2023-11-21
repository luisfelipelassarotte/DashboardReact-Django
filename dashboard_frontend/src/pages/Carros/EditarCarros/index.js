import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './editar.css';

function Editar() {
    const currentYear = new Date().getFullYear();
    const baseURL = "http://127.0.0.1:8000/carros/";
    const { carroId } = useParams();
    const [carroData, setCarroData] = useState({
        ano: new Date().getFullYear().toString(),
        disponivel: true,
        foto: null,
    });
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCarroData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    useEffect(() => {
        loadCarroData();
    }, [carroId]);

    async function loadCarroData() {
        try {
            const response = await fetch(`${baseURL}${carroId}/`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch carro data');
            }
            const data = await response.json();
            setCarroData(data);
        } catch (err) {
            console.error('Erro ao carregar dados do carro:', err);
        }
    }

    async function handleUpdate(event) {
        event.preventDefault();

        try {
            const formData = new FormData();
            if (carroData.foto instanceof File) {
                formData.append('foto', carroData.foto); // Verifica se é um arquivo de imagem válido
            }
            formData.append('marca', carroData.marca);
            formData.append('modelo', carroData.modelo);
            formData.append('ano', carroData.ano);
            formData.append('combustivel', carroData.combustivel);
            formData.append('preco_minimo', carroData.preco_minimo);
            formData.append('disponivel', carroData.disponivel);

            const response = await fetch(`${baseURL}${carroId}/`, {
                method: 'PATCH',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to update carro data');
            }
            navigate('/carros_list');
        } catch (err) {
            console.error('Erro ao atualizar carro:', err);
        }
    }

    function handleChange(event) {
        const { name, value, files } = event.target;

        if (files && files[0]) {
            setCarroData({ ...carroData, [name]: files[0] });
        } else {
            setCarroData({ ...carroData, [name]: value });
        }
    }

    return (
        <div className="editar-container">
            <h2>Editar Carro</h2>

            <form onSubmit={handleUpdate}>
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
                        value={carroData.marca || ''}
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
                        value={carroData.modelo || ''}
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
                        value={carroData.ano || ''}
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
                        value={carroData.combustivel}
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
                        value={carroData.preco_minimo || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Disponivel">Disponível:</label>
                    <input
                        type="checkbox"
                        id="Disponivel"
                        name="disponivel"
                        checked={carroData.disponivel}
                        onChange={handleCheckboxChange}
                    />
                </div>

                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default Editar;
