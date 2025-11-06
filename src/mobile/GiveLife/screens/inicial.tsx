import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App"; 
import Cadastro from "./cadastro";
export default function Inicial() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.fundo}>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
        ></Image>
        <Text style={styles.textogrande}>Olá!!!</Text>
        <Text style={styles.textopequeno}>Faça login ou crie sua conta</Text>
        {/* Botão de Cadastro */}
        <TouchableOpacity
          style={styles.botaocadastro}
          onPress={() => {
            navigation.navigate("Cadastro");
          }}
        >
          <Text style={styles.textobotao}>Cadastre-se</Text>
        </TouchableOpacity>
        {/* Botão de Login */}
        <TouchableOpacity style={styles.botaologin}>
          <Text style={styles.textobotao}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.textopequeno}>
          Quer ser um dos nossos parceiros?
        </Text>
        {/* Botão de Parceiro */}
        <TouchableOpacity style={styles.botaologin}>
          <Text style={styles.textobotao}>Seja parceiro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  fundo: {
    backgroundColor: "#D62828",
    justifyContent: "center",
    height: "auto",
    width: "auto",
  },
  logo: {
    width: 118,
    height: 140,
  },
  textogrande: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
  },
  textopequeno: {
    fontSize: 30,
    color: "#fff",
  },
  botaocadastro: {
    color: "#003049",
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "#fff",
    width: 208,
    height: 53,
    alignItems: "center",
  },
  botaologin: {
    color: "#D62828",
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "#fff",
    width: 208,
    height: 53,
    alignItems: "center",
  },
  textobotao: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
});
