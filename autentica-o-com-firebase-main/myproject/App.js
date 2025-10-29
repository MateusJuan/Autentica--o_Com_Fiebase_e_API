import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./telas/login";
import CriarConta from "./telas/CriarConta";
import ListaContatos from "./telas/ListaContatos";

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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
