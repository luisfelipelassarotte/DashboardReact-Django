import React, {useState} from 'react';

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

// Seu componente Login
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(credentials) {
        const csrfToken = getCookie('csrftoken');
        return fetch('http://127.0.0.1:8000/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const csrfToken = getCookie('csrftoken'); // Certifique-se de ter a função getCookie definida

            const response = await fetch('http://127.0.0.1:8000/loginuser/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({username, password}), // Variáveis username e password corretamente utilizadas
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data));

                window.location.replace('/');
            } else {
                console.error('Erro ao autenticar:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // setUsername corretamente utilizada
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // setPassword corretamente utilizada
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
