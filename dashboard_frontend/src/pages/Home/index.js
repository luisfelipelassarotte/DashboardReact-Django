import React from 'react';
import {Link} from 'react-router-dom';
import "./home.scss";
import { useEffect, useState } from "react";


import TopBox from "../../components/topBox/TopBox"
import ChartBoxVendas from "../../components/chartBoxVendas/Chartbox";
import ChartBoxLucro from "../../components/chartBoxLucro/Chartbox";
import ChartBoxVendaPorDia from "../../components/chartBoxVendaPorDia/Chartbox";
import BestSale from "../../components/melhorVenda/MelhorVenda";
import MediaVendedor from "../../components/GraficoPizza/mediaVendedor";
import LucroPorVenda from "../../components/lucroPorVenda/LucroPorVenda";
import GraficoCompra from "../../components/graficoCompra/GraficoCompra";
import GraficoVenda from "../../components/graficoVenda/GraficoVenda";

const HomePage = () => {
    return (
        <div className="home">
            <div className="box box1">
                <TopBox/>
            </div>
            <div className="box box2">
                <ChartBoxVendas/>
            </div>
            <div className="box box3">
                <ChartBoxLucro/>
            </div>
            <div className="box box4">
                <MediaVendedor/>
            </div>
            <div className="box box5">
                <ChartBoxVendaPorDia/>
            </div>
            <div className="box box6">
                <BestSale/>
            </div>
            <div className="box box7">
                <LucroPorVenda/>
            </div>
            <div className="box box8">
                <GraficoCompra/>
            </div>
            <div className="box box9">
                <GraficoVenda/>
            </div>
        </div>
    );
};

export default HomePage;

