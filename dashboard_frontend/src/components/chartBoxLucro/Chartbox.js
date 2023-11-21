import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import "./chartBox.scss";

const ChartBoxLucro = (props) => {
  const [topDealUsers, setTopDealUsers] = useState([]);
  const [totalProfitSum, setTotalProfitSum] = useState(0);
  const [totalSalesCount, setTotalSalesCount] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/vendas/')
      .then(response => response.json())
      .then(data => {
        const sortedByDateAndProfit = data.sort((a, b) => {
          const dateA = new Date(a.data_venda);
          const dateB = new Date(b.data_venda);
          if (dateA > dateB) return 1;
          if (dateA < dateB) return -1;

          return b.lucro - a.lucro;
        });
        const sumOfProfits = sortedByDateAndProfit.reduce((total, venda) => total + venda.lucro, 0);
        setTotalProfitSum(sumOfProfits);

        const countOfSales = sortedByDateAndProfit.length;
        setTotalSalesCount(countOfSales);

        setTopDealUsers(sortedByDateAndProfit);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <span id="Titulo">Total de Lucros</span>
        </div>
        <h1 id="Titulo">R$ {totalProfitSum}</h1>
        <Link to="/venda_list" id="Titulo">
          Ver todos
        </Link>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="90%" height={100}>
            <LineChart data={topDealUsers}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 0, y: 100 }}
              />
              <Line
                type="monotone"
                dataKey="lucro"
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
            style={{ color: totalSalesCount < 0 ? "tomato" : "limegreen" }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default ChartBoxLucro;
