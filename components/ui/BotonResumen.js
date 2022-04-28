import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { Button, Text } from 'native-base'
import globalStyles from '../../styles/global'
import { useNavigation } from '@react-navigation/native'

import PedidosContext from '../../context/pedidos/pedidosContext'

const BotonResumen = () => {

    //Redireccionar
    const navigation = useNavigation()

    //Leer el objeto del pedido
    const { pedido } = useContext(PedidosContext)

    if (pedido.length === 0) {
        return null
    }

    return (
        <Button
            style={[globalStyles.boton, styles.boton]}
            onPress={() => navigation.navigate("ResumenPedido")}
        >
            <Text style={globalStyles.btnText}>Ir a Pedido</Text>
        </Button>
    )
}

export default BotonResumen

const styles = StyleSheet.create({
    boton: {
        marginLeft: 85
    }
})