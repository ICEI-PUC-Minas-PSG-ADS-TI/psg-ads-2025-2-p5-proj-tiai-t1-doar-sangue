import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

const { width } = Dimensions.get("window");

export default function Inicial() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.fundo}>
      {/* LOGO */}
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* TÍTULO PRINCIPAL */}
      <Text style={styles.textogrande}>Olá!</Text>
      <Text style={styles.textopequeno}>Faça login ou crie sua conta</Text>

      {/* BOTÕES PRINCIPAIS */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaocadastro}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.textobotao}>Cadastre-se</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaologin}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.textobotao}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* SEÇÃO PARCEIRO */}
      <View style={styles.parceiroContainer}>
        <Text style={styles.textopequeno}>Quer ser um dos nossos parceiros?</Text>
        <TouchableOpacity
          style={styles.botaoparceiro}
          onPress={() => alert("Em breve!")}
        >
          <Text style={styles.textobotao}>Seja Parceiro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "#D62828",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 10,
  },
  textogrande: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  textopequeno: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 26,
  },
  botoesContainer: {
    width: "100%",
    alignItems: "center",
  },
  botaocadastro: {
    backgroundColor: "#003049",
    borderRadius: 30,
    width: "80%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  botaologin: {
    backgroundColor: "transparent",
    borderRadius: 30,
    width: "80%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
    borderWidth: 2,
    borderColor: "#fff",
  },
  botaoparceiro: {
    backgroundColor: "transparent",
    borderRadius: 30,
    width: "80%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
    marginTop: 15,
  },
  textobotao: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  parceiroContainer: {
    alignItems: "center",
  },
});
