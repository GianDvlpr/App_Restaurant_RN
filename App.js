import 'react-native-gesture-handler';
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import DetallePlato from './views/DetallePlato';
import FormularioPlato from './views/FormularioPlato';
import Menu from './views/Menu';
import ProgresoPedido from './views/ProgresoPedido';
import ResumenPedido from './views/ResumenPedido';
import NuevaOrden from './views/NuevaOrden';

//Importar el state de context
import FirebaseState from './context/firebase/firebaseState';



const Stack = createStackNavigator()

const App = () => {
  return (
    <>
      <FirebaseState>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#FFDA00'
              },
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}
          >
            <Stack.Screen
              name='NuevaOrden'
              component={NuevaOrden}
              options={{
                title: 'Nueva Orden'
              }}
            />

            <Stack.Screen
              name='Menu'
              component={Menu}
              options={{
                title: 'Nuestro Menú'
              }}
            />

            <Stack.Screen
              name='DetallePlato'
              component={DetallePlato}
              options={{
                title: 'Detalle Plato'
              }}
            />

            <Stack.Screen
              name='FormularioPlato'
              component={FormularioPlato}
              options={{
                title: 'Ordenar Plato'
              }}
            />

            <Stack.Screen
              name='ResumenPedido'
              component={ResumenPedido}
              options={{
                title: 'Resumen del Pedido'
              }}
            />

            <Stack.Screen
              name='ProgresoPedido'
              component={ProgresoPedido}
              options={{
                title: 'Progreso del Pedido'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FirebaseState>
    </>
  )
}

export default App