import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ListaCarros from "./pages/Carros/ListaCarros";
import AdicionarCarros from "./pages/Carros/AdicionarCarros";
import EditarCarros from "./pages/Carros/EditarCarros";

import ListaVenda from "./pages/Venda/ListaVenda";
import EditarVenda from "./pages/Venda/EditarVenda";
import AdicionarVenda from "./pages/Venda/AdicionarVenda";

import ListaVendedor from "./pages/Vendedor/ListaVendedor";
import EditarVendedor from "./pages/Vendedor/EditarVendedor";
import AdicionarVendedor from "./pages/Vendedor/AdicionarVendedor";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer";

const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    return !!user;
};

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/loginuser" element={<Login/>}/>
                <Route path="/registeruser" element={<Register/>}/>

                <Route path="/carros_list" element={<ListaCarros/>}/>
                <Route path="/carros_adicionar" element={<AdicionarCarros/>}/>
                <Route path="/carros_editar/:carroId" element={<EditarCarros/>}/>

                <Route path="/venda_list" element={<ListaVenda/>}/>
                <Route path="/venda_adicionar" element={<AdicionarVenda/>}/>
                <Route path="/venda_editar/:vendaId" element={<EditarVenda/>}/>

                <Route path="/vendedor_list" element={<ListaVendedor/>}/>
                <Route path="/vendedor_adicionar" element={<AdicionarVendedor/>}/>
                <Route path="/vendedor_editar/:vendedorId" element={<EditarVendedor/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}


export default App;
