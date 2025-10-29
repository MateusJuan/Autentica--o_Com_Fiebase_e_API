import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./telas/login";
import CriarConta from "./telas/CriarConta";
import ListaContatos from "./telas/ListaContatos";
import EditarContato from "./telas/EditarContato";
import CriarContato from "./telas/CriarContato";

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CriarConta"
          component={CriarConta}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ListaContatos"
          component={ListaContatos}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditarContato"
          component={EditarContato}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CriarContato"
          component={CriarContato}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
