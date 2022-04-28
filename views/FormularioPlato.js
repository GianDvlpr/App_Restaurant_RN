import { StyleSheet, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { Container, Content, Form, Icon, Grid, Input, Col, Text, Button, Footer, FooterTab } from 'native-base'
import PedidosContext from '../context/pedidos/pedidosContext'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global'

const FormularioPlato = () => {

    const [cantidad, setCantidad] = useState(1)
    const [total, setTotal] = useState(0)


    const { plato, guardarPedido } = useContext(PedidosContext)
    const { precio } = plato;

    //Redireccionar
    const navigation = useNavigation()

    const incrementar = () => {
        const nuevaCantidad = parseInt(cantidad) + 1;
        setCantidad(nuevaCantidad)
    }

    const decrementar = () => {
        if (cantidad > 1) {
            const nuevaCantidad = parseInt(cantidad) - 1;
            setCantidad(nuevaCantidad)
        }
    }

    const calcularTotal = () => {
        const totalPagar = precio * cantidad;
        setTotal(totalPagar)
    }

    useEffect(() => {
        calcularTotal()
    }, [cantidad])

    //Confirmar la orden
    const confirmarOrden = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            'Un pedido confirmado ya no se podrá modificar.',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        //Almacena el pedido al principal
                        const pedido = {
                            ...plato,
                            cantidad,
                            total
                        }
                        guardarPedido(pedido)
                        //Navegar hacia el resumen
                        navigation.navigate('ResumenPedido')
                    }
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    }

    return (
        <Container>
            <Content>
                <Form>
                    <Text style={globalStyles.titulo}>Cantidad</Text>
                    <Grid>
                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 80, justifyContent: 'center', width: 140 }}
                                onPress={() => decrementar()}
                            >
                                <Icon>QUITAR</Icon>
                            </Button>
                        </Col>
                        <Col>
                            <Input
                                value={cantidad.toString()}
                                keyboardType='numeric'
                                style={{ textAlign: 'center', fontSize: 25 }}
                                onChangeText={cantidad => setCantidad(cantidad)}
                            />
                        </Col>
                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 80, justifyContent: 'center', width: 140 }}
                                onPress={() => incrementar()}
                            >
                                <Icon>AGREGAR</Icon>
                            </Button>
                        </Col>
                    </Grid>
                    <Text style={globalStyles.cantidad}>Subtotal: S/{total}.00</Text>
                </Form>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.boton}
                        onPress={() => confirmarOrden()}
                    >
                        <Text style={globalStyles.btnText}>Agregar</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default FormularioPlato

const styles = StyleSheet.create({})