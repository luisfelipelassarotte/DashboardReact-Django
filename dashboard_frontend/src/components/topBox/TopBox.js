import { useState, useEffect } from 'react';
import "./topbox.scss";

const TopBox = () => {
    const [topDealUsers, setTopDealUsers] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/vendedores/')
            .then(response => response.json())
            .then(data => {
                // Ordenar por maior quantidade de vendas
                const sortedByTotalSales = data.sort((a, b) => b.total_vendas - a.total_vendas);

                // Ordenar por valor das vendas (caso haja empate na quantidade de vendas)
                const sortedByTotalSalesValue = sortedByTotalSales.sort((a, b) => b.total_ganho_vendas - a.total_ganho_vendas);

                setTopDealUsers(sortedByTotalSalesValue);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }, []);

    return (
        <div className="topBox">
            <h1>Melhores Vendedores</h1>
            <div className="list">
                {topDealUsers.map(user=>(
                    <div className="listItem" key={user.id}>
                        <div className="user">
                            <div className="userTexts">
                                <span className="username">{user.username}</span>
                                <span className="email">{user.email}</span>
                            </div>
                        </div>
                        <span className="amount">R$ {user.total_ganho_vendas}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopBox;
