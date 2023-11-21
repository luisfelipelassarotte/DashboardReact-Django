import React from 'react';
import "./navbar.scss"
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/">
                <div className='logo'>
                    <img src="logocompraevendaautomoveis.png" alt=""/>
                    <span id="titulo">C.V. AUTOMOVEIS</span>
                </div>
            </Link>
            <div className="Links">
                <div className='adicionar_carro'>
                    <Link to="/carros_list/">
                        <button id="LinkRegistros"><p>Registro de Carros</p></button>
                    </Link>
                </div>
                <div className='adicionar_venda'>
                    <Link to="/venda_list/">
                        <button id="LinkRegistros"><p>Registro de Vendas</p></button>
                    </Link>
                </div>
                <div className='adicionar_vendedor'>
                    <Link to="/vendedor_list/">
                        <button id="LinkRegistros"><p>Registro de Vendedores</p></button>
                    </Link>
                </div>
            </div>
            <div className='icons'>
                <div className="notification">
                    <img src="/notifications.svg" alt=""/>
                    <span>1</span>
                </div>
                <div className="user">
                    <img
                        src="https://img.freepik.com/fotos-gratis/vendedor-em-um-carro-showroom_1303-13625.jpg"
                        alt=""
                    />
                    <span>Cleitin ADM</span>
                </div>
                <img src="/settings.svg" alt="" className="icon"/>
            </div>
        </div>
    )
}

export default Navbar