import { StyleSheet, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Container, Text, H1, H3, Button } from 'native-base'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import PedidosContext from '../context/pedidos/pedidosContext'
import firebase from '../firebase'
import Countdown from 'react-countdown';

const ProgresoPedido = () => {
    //Redireccionar
    const navigation = useNavigation()

    const { idpedido } = useContext(PedidosContext)

    const [tiempo, setTiempo] = useState(0)
    const [completado, setCompletado] = useState(false);

    useEffect(() => {
        const obtenerProducto = () => {
            firebase.db.collection('ordenes').doc(idpedido).onSnapshot(function (doc) {
                setTiempo(doc.data().tiempoEntrega)
                setCompletado(doc.data().completado)
            })
        }
        obtenerProducto()
    }, []);

    //Muestra el countdown
    const renderer = ({ minutes, seconds }) => {
        return (
            <Text style={styles.tiempo}>{minutes}:{seconds}</Text>
        )
    }


    return (
        <Container style={globalStyles.contenedor}>
            <View style={[globalStyles.contenido, { marginTop: 50 }]}>
                {tiempo === 0 && (
                    <>
                        <Text style={{ textAlign: 'center' }}>Hemos recibido tu orden...</Text>
                        <Text style={{ textAlign: 'center' }}>Calculando el tiempo de entrega...</Text>
                    </>
                )}
                {!completado && tiempo > 0 && (
                    <>
                        <Text style={{ textAlign: 'center' }}>Su orden estará lista en: </Text>
                        <Text style={{ textAlign: 'center' }}>
                            <Countdown
                                date={Date.now() + tiempo * 60000}
                                renderer={renderer}
                            />
                        </Text>
                    </>
                )}

                {completado && (
                    <>
                        <H1 style={styles.textoCompletado}>Orden Lista</H1>
                        <H3 style={styles.textoCompletado}>Por favor, pasar a recoger su pedido</H3>
                        <Button
                            style={[globalStyles.boton, { marginTop: 100 }]}
                            rounded
                            block
                            onPress={() => navigation.navigate('NuevaOrden')}
                        >
                            <Text>Comenzar Orden Nueva</Text>
                        </Button>
                    </>
                )}
            </View>
        </Container>
    )
}

export default ProgresoPedido

const styles = StyleSheet.create({
    tiempo: {
        marginBottom: 20,
        fontSize: 60,
        marginTop: 30,
    },
    textoCompletado: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    }
})