import React from 'react';
//estilos
import './main.css';
//imagenes
import noFound from './imagenes/four0four.svg';

const Four0Four = () => {
    return (
        <div className="fondo vh-100 w-100 d-flex">
            <div className="m-auto">
                <h3 className="text-white text-center my-5">Lo siento, No encontré lo que buscas...</h3>
                <img src={noFound} alt="" />
            </div>   
        </div>
    );
};

export default Four0Four;