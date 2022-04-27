import React, { useReducer } from 'react';

import PedidosReducer from './pedidosReducer'
import PedidosContext from './pedidosContext'

import { SELECCIONAR_PRODUCTO } from '../../types'

const PedidosState = props => {

    //Creando state inicial
    const initialState = {
        pedido: [],
        plato: null
    }

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(PedidosReducer, initialState)

    //Seleccionar el producto
    const seleccionarPlato = plato => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: plato
        })
    }

    return (
        <PedidosContext.Provider
            value={{
                pedido: state.pedido,
                plato: state.plato,
                seleccionarPlato
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidosState