import React, { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import "./graficoVenda.scss";

const GraficoVenda = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/vendas/')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(venda => ({
          name: `${venda.marca} ${venda.modelo}`, // Nome do carro
          Valor: venda.preco, // Valor de venda do carro
        }));

        setChartData(formattedData);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <div className="barChartBox">
      <h1>Valor de Venda por Carro</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey="Valor" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraficoVenda;
