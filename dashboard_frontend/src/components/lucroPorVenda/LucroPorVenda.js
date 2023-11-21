import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";

const BigChartBox = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/vendas/')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(item => ({
          name: item.data_venda, // Use a data da venda como nome no eixo X
          valorVenda: item.preco, // Valor da venda para o eixo Y (venda)
          valorLucro: item.lucro, // Valor do lucro para o eixo Y (lucro)
        }));

        setChartData(formattedData);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <div className="bigChartBox">
      <h1>Relação Lucro/Venda</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="valorVenda"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="valorLucro"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
