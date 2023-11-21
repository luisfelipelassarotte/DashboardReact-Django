import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import "./chartBox.scss";

const ChartBoxVendaPorDia = (props) => {
  const [salesByDay, setSalesByDay] = useState([]);
  const [totalSalesSum, setTotalSalesSum] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/vendas/')
      .then(response => response.json())
      .then(data => {
        // Agrupando vendas por dia
        const groupedSales = data.reduce((accumulator, venda) => {
          const date = new Date(venda.data_venda).toLocaleDateString();
          if (!accumulator[date]) {
            accumulator[date] = { date, quantity: 0 };
          }
          accumulator[date].quantity++;
          return accumulator;
        }, {});

        const salesData = Object.values(groupedSales);

        setSalesByDay(salesData);

        // Calculando o total de vendas
        const totalSales = salesData.reduce((total, day) => total + day.quantity, 0);
        setTotalSalesSum(totalSales);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <span id="Titulo">Quantidade de Vendas</span>
        </div>
        <h1 id="Titulo">{totalSalesSum}</h1>
        <Link to="/venda_list" id="Titulo">
          Ver todos
        </Link>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="90%" height={100}>
            <LineChart data={salesByDay}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 5, y: 100 }}
              />
              <Line
                type="monotone"
                dataKey="quantity"
                stroke="limegreen"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartBoxVendaPorDia;
