import React, {useEffect, useState} from "react";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import "./pieChartBox.scss";

const MediaVendedor = () => {
    const [averageSales, setAverageSales] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/vendas/')
            .then(response => response.json())
            .then(data => {
                // Calculando a média do valor de venda de cada vendedor
                const salesBySeller = data.reduce((accumulator, venda) => {
                    if (!accumulator[venda.username]) {
                        accumulator[venda.username] = {
                            name: venda.username,
                            value: venda.preco,
                            color: getRandomColor()
                        };
                    } else {
                        accumulator[venda.username].value += venda.preco;
                    }
                    return accumulator;
                }, {});

                const totalSellers = Object.values(salesBySeller);
                totalSellers.forEach(seller => {
                    seller.value /= totalSellers.length;
                    seller.value = Math.round(seller.value);
                });

                setAverageSales(totalSellers);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }, []);
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="pieChartBox">
            <h1>Média do Valor de Venda por Vendedor</h1>
            <div className="chart">
                <ResponsiveContainer width="99%" height={300}>
                    <PieChart>
                        <Tooltip contentStyle={{background: "white", borderRadius: "5px"}}/>
                        <Pie
                            data={averageSales}
                            innerRadius={"70%"}
                            outerRadius={"90%"}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {averageSales.map((item) => (
                                <Cell key={item.name} fill={item.color}/>
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="options">
                {averageSales.map((item) => (
                    <div className="option" key={item.name}>
                        <div className="title">
                            <div className="dot" style={{backgroundColor: item.color}}/>
                            <span>{item.name}</span>
                        </div>
                        <span>R$ {item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaVendedor;
