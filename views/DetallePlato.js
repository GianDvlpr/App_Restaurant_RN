import { StyleSheet, Image, View } from 'react-native'
import React, { useContext } from 'react'
import { Container, Content, Footer, FooterTab, Button, Body, Text, H1, Card, CardItem } from 'native-base'
import PedidosContext from '../context/pedidos/pedidosContext'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global'

const DetallePlato = () => {

    //Pedido context
    const { plato } = useContext(PedidosContext)
    const { nombre, imagen, descripcion, precio } = plato;
    //Redireccionar
    const navigation = useNavigation()

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>{nombre}</H1>
                <Card>
                    <CardItem>
                        <Body>
                            <Image
                                style={globalStyles.imagen}
                                source={{ uri: imagen }}
                            />
                            <Text style={{ marginTop: 20 }}>{descripcion}</Text>
                            <Text style={globalStyles.cantidad}>Precio: S/{precio}.00</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.boton}
                        onPress={() => navigation.navigate("FormularioPlato")}
                    >
                        <Text style={globalStyles.btnText}>Ordenar</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default DetallePlato

const styles = StyleSheet.create({})