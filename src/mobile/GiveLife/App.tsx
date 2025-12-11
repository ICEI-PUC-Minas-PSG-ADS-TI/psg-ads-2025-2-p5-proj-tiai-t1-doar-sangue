import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Inicial from "./screens/inicial";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cadastro from "./screens/cadastro";
import Login from "./screens/login";
import CadastroInstituicao from "./screens/cadastroInstituicao";
import EsqueciSenha from "./screens/esqueciSenha";
import TabInstituicao from "./nav/tab_instituicao";
import Contatos from "./screens/contatos";
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
  CadastroInstituicao:undefined;
  EsqueciSenha: undefined;
  Dashboard: undefined;
  Campanha: undefined;
  NovaCampanha: undefined;
  HomeDoador: undefined;
  Instituicao: undefined;
  Contatos: undefined;
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
        <Stack.Screen name="CadastroInstituicao" component={CadastroInstituicao} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
        <Stack.Screen name ="Contatos" component={Contatos}/>
        <Stack.Screen name="Instituicao" component={TabInstituicao}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
