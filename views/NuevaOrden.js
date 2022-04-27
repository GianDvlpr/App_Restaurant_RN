import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Container, Button, Text } from 'native-base'
import globalStyles from '../styles/global'

import { useNavigation } from '@react-navigation/native'

const NuevaOrden = () => {

    const navigation = useNavigation()

    return (
        <Container style={globalStyles.contenedor}>
            <View style={[globalStyles.contenido, styles.contenido]}>
                <Button
                    style={globalStyles.boton}
                    rounded={true}
                    onPress={() => navigation.navigate('Menu')}
                >
                    <Text
                        style={globalStyles.btnText}
                    >Crear nueva Orden</Text>
                </Button>
            </View>
        </Container>
    )
}

export default NuevaOrden

const styles = StyleSheet.create({
    contenido: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 120
    }
})