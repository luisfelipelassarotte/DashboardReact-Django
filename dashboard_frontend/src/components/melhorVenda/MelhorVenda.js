import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./bestsales.scss";

const BestSale = (props) => {
  const [topDealUser, setTopDealUser] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/vendas/')
      .then(response => response.json())
      .then(data => {
        const sortedByProfit = data.slice().sort((a, b) => b.lucro - a.lucro);

        if (sortedByProfit.length > 0) {
          setTopDealUser(sortedByProfit[0]);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <span id="Titulo">Melhor Venda</span>
        </div>
        {topDealUser && (
          <div>
            <h1 id="Titulo">Lucro da venda: R$ {topDealUser.lucro}</h1>
            <p id="Titulo">Feito por {topDealUser.username}</p>
            <Link to={`/venda_list/${topDealUser.pk}`} id="Titulo">
              Ver detalhes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSale;
