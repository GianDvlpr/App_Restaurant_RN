import React, { useReducer } from 'react';

import PedidosReducer from './pedidosReducer'
import PedidosContext from './pedidosContext'



const PedidosState = props => {

    //Creando state inicial
    const initialState = {
        pedido: []
    }

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(PedidosReducer, initialState)

    return (
        <PedidosContext.Provider
            value={{
                pedido: state.pedido
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidosState