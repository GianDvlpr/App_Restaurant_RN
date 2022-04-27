import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1,
    },
    boton:{
        backgroundColor: '#ffda00',
    },
    btnText:{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#000',
    },
    contenido:{
        marginHorizontal: '2.5%',
        flex: 1,
        paddingLeft: 120
    }
})

export default globalStyles