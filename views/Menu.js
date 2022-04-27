import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, Fragment } from 'react'
// import { Container, Separator, FlatList, ListItem, Text, Left, Image, Box, View } from 'native-base'
import { Container, Separator, Content, List, ListItem, Text, Left, Thumbnail, Body } from 'native-base'
import globalStyles from '../styles/global'

import FirebaseContext from '../context/firebase/firebaseContext'
import PedidosContext from '../context/pedidos/pedidosContext'

const Menu = () => {

    //Context de firebase
    const { menu, ObtenerProductos } = useContext(FirebaseContext)

    //Context de pedidos
    const { seleccionarPlato } = useContext(PedidosContext)

    //Redireccionar
    const navigation = useNavigation()

    useEffect(() => {
        ObtenerProductos();
    }, []);

    const mostrarHeading = (categoria, i) => {

        if (i > 0) {
            const cateAnterior = menu[i - 1].categoria;
            if (cateAnterior !== categoria) {
                return (
                    <Separator style={styles.separator}>
                        <Text style={styles.separatorText}>{categoria}</Text>
                    </Separator>
                )
            }
        } else {
            return (
                <Separator style={styles.separator}>
                    <Text style={styles.separatorText}>{categoria}</Text>
                </Separator>
            )
        }
    }


    return (
        <Container style={globalStyles.contenedor}>
            <Content>
                <List>
                    {menu.map((plato, i) => {
                        // console.log(plato)
                        const { imagen, nombre, descripcion, categoria, id, precio } = plato
                        return (
                            <Fragment key={id}>
                                {mostrarHeading(categoria, i)}
                                <ListItem
                                    onPress={() => {
                                        //Eliminar propiedades del plato
                                        const { existencia, ...plato2 } = plato;

                                        seleccionarPlato(plato2)
                                        navigation.navigate('DetallePlato')
                                    }}
                                >
                                    <Thumbnail
                                        square
                                        large
                                        source={{ uri: imagen }}
                                    />
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text
                                            note
                                            numberOfLines={2}
                                        >{descripcion}</Text>
                                        <Text>S/{precio}.00</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>
            </Content>


        </Container>
    )
}

export default Menu

const styles = StyleSheet.create({
    separator: {
        backgroundColor: '#000',
    },
    separatorText: {
        color: '#ffda00',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }

})