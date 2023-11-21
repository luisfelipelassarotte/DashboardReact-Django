import React, {useState, useEffect} from 'react';

function RegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
        telefone: '',
        cpf: '',
        conta_bancaria: '',
        endereco: '',
        csrfToken: '', // Adicione um estado para o token CSRF
    });

    useEffect(() => {
        // Fetch para obter o token CSRF do backend
        async function fetchCSRFToken() {
            try {
                const response = await fetch('http://127.0.0.1:8000/csrf_token/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const { csrfToken } = await response.json();
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    csrfToken, // Atualiza o estado com o token CSRF obtido do backend
                }));
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        }

        fetchCSRFToken();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function handleSubmit() {
        try {
            await fetch('http://127.0.0.1:8000/registeruser/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': formData.csrfToken, // Usa o token CSRF no cabeçalho da requisição
                },
                body: JSON.stringify(formData),
            });
        } catch (err) {
            console.log(err);
        }
        console.log('Form Data:', formData);
    }

    return (
        <form>
            <input type='hidden' name='csrfmiddlewaretoken' value='{{ csrf_token }}' />
            <h3>Signup Here</h3>

            <label htmlFor="username">Username</label>
            <input
                type="text"
                placeholder="Username"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
                type="email"
                placeholder="Email or Phone"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
            />

            <label htmlFor="password1">Password</label>
            <input
                type="password"
                placeholder="Password"
                id="password1"
                name="password1"
                value={formData.password1}
                onChange={handleChange}
            />

            <label htmlFor="password2">Confirm Password</label>
            <input
                type="password"
                placeholder="Confirm Password"
                id="password2"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
            />

            <label htmlFor="telefone">Telefone</label>
            <input
                type="text"
                placeholder="Telefone"
                name="telefone"
                id="telefone"
                value={formData.telefone}
                onChange={handleChange}
            />

            <label htmlFor="cpf">CPF</label>
            <input
                type="text"
                placeholder="CPF"
                name="cpf"
                id="cpf"
                value={formData.cpf}
                onChange={handleChange}
            />

            <label htmlFor="conta_bancaria">Conta Bancária</label>
            <input
                type="text"
                placeholder="Conta Bancária"
                name="conta_bancaria"
                id="conta_bancaria"
                value={formData.conta_bancaria}
                onChange={handleChange}
            />

            <label htmlFor="endereco">Endereço</label>
            <input
                type="text"
                placeholder="Endereço"
                name="endereco"
                id="endereco"
                value={formData.endereco}
                onChange={handleChange}
            />

            <button type="button" onClick={handleSubmit}>Signup</button>
            {/* Adicione um link para a página de login */}
            <a href="/loginuser">I already have an account</a>
        </form>
    );
}

export default RegisterForm;
