import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Inicial from "./screens/inicial";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cadastro from "./screens/cadastro";
import Login from "./screens/login";
export type RootStackParamList = {
  Inicial: undefined;
  Cadastro: undefined;
  Login: undefined;
  NavLista: undefined;
  Home: undefined;
  Config: undefined;
  Gastos: undefined;
  Ajuda: undefined;
  Sobre: undefined;
  Suporte: undefined;
  Estoque: undefined;
  Termos: undefined;
  Privacidade: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    // Container da navegação do app, adicionar mais telas como componentes Stack.Screen seguindo o modelo abaixo
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* DEIXA ESSA TELA PRIMEIRO, ELA TEM QUE CARREGAR PRIMEIRO */}
        <Stack.Screen name="Inicial" component={Inicial} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
