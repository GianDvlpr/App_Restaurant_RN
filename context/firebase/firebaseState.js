import React, { useReducer } from 'react';

import FirebaseReducer from './firebaseReducer'
import FirebaseContext from './firebaseContext'

import firebase from '../../firebase'

import { OBTENER_PRODUCTOS_SUCCESS } from '../../types'

import _ from 'lodash'

const FirebaseState = props => {

    //Creando state inicial
    const initialState = {
        menu: []
    }

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState)

    //Funcion que trae los productos
    const ObtenerProductos = () => {


        //Consultado firebase
        firebase.db.collection('productos').where("existencia", '==', true).onSnapshot(manejarSnapshot);

        function manejarSnapshot(snapshot) {
            let platos = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            //Ordenar platos por categoria con lodash
            platos = _.sortBy(platos, 'categoria');

            //Hay resultados de la bd
            dispatch({
                type: OBTENER_PRODUCTOS_SUCCESS,
                payload: platos
            })
        }
    }

    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                ObtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState