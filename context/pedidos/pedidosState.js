import React, { useReducer } from 'react';

import PedidosReducer from './pedidosReducer'
import PedidosContext from './pedidosContext'

import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDEN_PLATO, MOSTRAR_RESUMEN, ELIMINAR_PRODUCTO } from '../../types'

const PedidosState = props => {

    //Creando state inicial
    const initialState = {
        pedido: [],
        plato: null,
        total: 0
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

    //Cuando el usuario confirma un plato
    const guardarPedido = pedido => {
        dispatch({
            type: CONFIRMAR_ORDEN_PLATO,
            payload: pedido
        })
    }

    //Muestra el total a pagar en el resumen
    const mostrarResumen = (total) => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    //Elimina un articulo del carrito
    const eliminarProducto = (id) => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }

    return (
        <PedidosContext.Provider
            value={{
                pedido: state.pedido,
                plato: state.plato,
                total: state.total,
                seleccionarPlato,
                guardarPedido,
                mostrarResumen,
                eliminarProducto
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidosState