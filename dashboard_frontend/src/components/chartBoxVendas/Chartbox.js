import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Line, LineChart, ResponsiveContainer, Tooltip} from "recharts";
import "./chartBox.scss";

const ChartBoxVendas = (props) => {
    const [topDealUsers, setTopDealUsers] = useState([]);
    const [totalSalesSum, setTotalSalesSum] = useState(0);
    const [totalSalesCount, setTotalSalesCount] = useState(0);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/vendas/')
            .then(response => response.json())
            .then(data => {
                const sortedByDateAndPrice = data.sort((a, b) => {
                    const dateA = new Date(a.data_venda);
                    const dateB = new Date(b.data_venda);
                    if (dateA > dateB) return 1;
                    if (dateA < dateB) return -1;

                    return b.preco - a.preco;
                });
                const sumOfSales = sortedByDateAndPrice.reduce((total, venda) => total + venda.preco, 0);
                setTotalSalesSum(sumOfSales);

                const countOfSales = sortedByDateAndPrice.length;
                setTotalSalesCount(countOfSales);

                setTopDealUsers(sortedByDateAndPrice);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }, []);

    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    <span id="Titulo">Valor Total de Vendas</span>
                </div>
                <h1 id="Titulo">R$ {totalSalesSum}</h1>
                <Link to="/venda_list" id="Titulo">
                    Ver todos
                </Link>
            </div>
            <div className="chartInfo">
                <div className="chart">
                    <ResponsiveContainer width="90%" height={100}>
                        <LineChart data={topDealUsers}>
                            <Tooltip
                                contentStyle={{background: "transparent", border: "none"}}
                                labelStyle={{display: "none"}}
                                position={{x: 5, y: 100}}
                            />
                            <Line
                                type="monotone"
                                dataKey="preco"
                                stroke="limegreen"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="texts">
                <span
                    className="percentage"
                    style={{color: totalSalesCount < 0 ? "tomato" : "limegreen"}}
                >
                </span>
                </div>
            </div>
        </div>
    );

};

export default ChartBoxVendas;
