import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inicial from "./screens/inicial";
import Cadastro from "./screens/cadastro";
import Login from "./screens/login";
import CadastroInstituicao from "./screens/cadastroInstituicao";
import EsqueciSenha from "./screens/esqueciSenha";
import NovaSenha from "./screens/novaSenha";
import TelaDoador from "./screens/telaDoador";

// TIPAGEM
export type RootStackParamList = {
  Inicial: undefined;
  Cadastro: undefined;
  Login: undefined;
  AtualizarSenha: undefined;
  CadastroInstituicao: undefined;
  EsqueciSenha: undefined;
  TelaDoador: undefined;
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

// CONFIGURAÇÃO DE DEEP LINK
const linking = {
  prefixes: ["givlife://"],
  config: {
    screens: {
      NovaSenha: "reset-password",
    },
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Inicial" component={Inicial} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="CadastroInstituicao" component={CadastroInstituicao} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
        <Stack.Screen name="NovaSenha" component={NovaSenha} />
        <Stack.Screen name="TelaDoador" component={TelaDoador} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
