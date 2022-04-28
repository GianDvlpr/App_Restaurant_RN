import { StyleSheet, Alert } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Button, H1, Footer, FooterTab } from 'native-base'
import PedidosContext from '../context/pedidos/pedidosContext'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global'
import firebase from '../firebase'

const ResumenPedido = () => {

    //Context del pedido
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoOrdenado } = useContext(PedidosContext)
    //Redireccionar
    const navigation = useNavigation()

    useEffect(() => {
        calcularTotal()
    }, [pedido])

    const calcularTotal = () => {
        let nuevoTotal = 0
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);
        mostrarResumen(nuevoTotal)
    }

    //Redirecciona a progreso pedido
    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez realizado el pedido no podrá ser modificado',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        //Creando objeto con la inf del pedido
                        const pedidoOBJ = {
                            tiempoEntrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido,
                            creado: Date.now()
                        }
                        //Escribir el pedido en firebase
                        try {
                            const pedido = await firebase.db.collection('ordenes').add(pedidoOBJ)
                            pedidoOrdenado(pedido.id)
                            //Redireccionar a progreso
                            navigation.navigate("ProgresoPedido")
                        } catch (error) {
                            console.log(error)
                        }
                    }
                },
                { text: 'Revisar', style: 'cancel' }
            ]
        )
    }

    //Elimina el producto del pedido
    const confirmarEliminacion = (id) => {
        Alert.alert(
            '¿Deseas eliminar este articulo?',
            'Una vez eliminado el pedido deberá ser agregado nuevamente',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        //Eliminar del state
                        eliminarProducto(id)
                        //Calcular

                    }
                },
                { text: 'Revisar', style: 'cancel' }
            ]
        )
    }

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
                {pedido.map((plato, i) => {
                    const { cantidad, nombre, imagen, precio, id } = plato;
                    return (
                        <List
                            key={id + i}
                        >
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail
                                        large
                                        square
                                        source={{ uri: imagen }}
                                    />
                                </Left>
                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio: S/{precio}.00</Text>
                                    <Button
                                        full
                                        danger
                                        style={{ marginTop: 20 }}
                                        onPress={() => confirmarEliminacion(id)}
                                    >
                                        <Text style={[globalStyles.btnText, { color: '#fff' }]}>Eliminar</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}
                <Text style={globalStyles.cantidad}>Total a Pagar: S/{total}.00</Text>
                <Button
                    dark
                    block
                    style={[styles.boton]}
                    onPress={() => navigation.navigate('Menu')}
                >
                    <Text style={[globalStyles.btnText, { color: '#fff' }]}>Seguir Pidiendo</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.boton}
                        onPress={() => progresoPedido()}
                    >
                        <Text style={globalStyles.btnText}>Ordenar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container >
    )
}

export default ResumenPedido

const styles = StyleSheet.create({
    boton: {
        marginTop: 40
        
    }
})