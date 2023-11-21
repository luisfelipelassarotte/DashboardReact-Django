import React, { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import "./graficoCompra.scss";

const GraficoCompra = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/carros/')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(carro => ({
          name: `${carro.marca} ${carro.modelo}`, // Nome do carro
          Valor: carro.preco_minimo, // Valor mínimo de compra do carro
        }));

        setChartData(formattedData);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <div className="barChartBox">
      <h1>Valor de Compra por Carro</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey="Valor" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraficoCompra;
