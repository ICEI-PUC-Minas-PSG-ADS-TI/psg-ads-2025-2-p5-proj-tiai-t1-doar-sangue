import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";

export default function Cadastro() {
  return (
    <View style={styles.fundo}>
      <View style={styles.container}>
        <Text style={styles.textogrande}>Crie Sua Conta</Text>
        <Text style={styles.textopequeno}>
          Doe sangue, salve vidas. juntos podemos fazer a diferença.
        </Text>
        <TextInput style={styles.input} placeholder="Nome"></TextInput>
        <TextInput style={styles.input} placeholder="E-mail"></TextInput>
        <TextInput style={styles.input} placeholder="Senha"></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Confirme a Senha"
        ></TextInput>
        {/* Botão de Confirmar */}
        <TouchableOpacity style={styles.botaoconfirmar}>
          <Text style={styles.textobotao}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fundo: {
    height: "auto",
    width: "auto",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  textogrande: {
    fontSize: 50,
    color: "#003049",
    fontWeight: "bold",
  },
  textopequeno: {
    fontSize: 30,
    color: "#003049",
  },
  input: {
    width: 377,
    height: 48,
    backgroundColor: "#003049",
    color: "#fff",
    borderColor: "#fff",
    borderWidth: 10,
  },
  botaoconfirmar: {
    backgroundColor: "#D62828",
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
