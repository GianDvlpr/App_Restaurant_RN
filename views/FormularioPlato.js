import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Container, Content, Form, Icon, Grid, Input, Col, Text, Button } from 'native-base'
import PedidosContext from '../context/pedidos/pedidosContext'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global'

const FormularioPlato = () => {
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
                                style={{ height: 80, justifyContent: 'center' }}
                            >
                                <Icon>QUITAR</Icon>
                            </Button>
                        </Col>
                        <Col>
                            <Input
                                value="1"
                                style={{ textAlign: 'center', fontSize: 25 }}
                            />
                        </Col>
                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 80, justifyContent: 'center' }}
                            >
                                <Icon>AGREGAR</Icon>
                            </Button>
                        </Col>
                    </Grid>
                </Form>
            </Content>
        </Container>
    )
}

export default FormularioPlato

const styles = StyleSheet.create({})