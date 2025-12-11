import React from "react";
import { Text, View, ScrollView, StyleSheet,TouchableOpacity, } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native"; 
interface CardInstituicaoProps {
  Nome: string;
  Horario: string;
  Endereco: string;
}

const CardInstituicao: React.FC<CardInstituicaoProps> = ({ Nome, Horario, Endereco }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.textogrande}>{Nome}</Text>
      <Text style={styles.textomedio}>{Endereco}</Text>
      <Text style={styles.textomedio}>{Horario}</Text>
    </View>
  );
};

const gerarDadosInstituicao = () => {
  const dados = [];
  for (let i = 1; i <= 10; i++) {
    dados.push({
      Nome: `Instituição ${i}`,
      Endereco: `Rua Principal, Número ${100 + i}`,
      Horario: i % 2 === 0 ? "9:00 as 18:00" : "8:00 as 17:00",
    });
  }
  return dados;
};
export default function Contatos() {
  const listaInstituicoes = gerarDadosInstituicao();
const navigation =
     useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    
    <View style={styles.fundo}>
      <ScrollView style={styles.container}>
        {/* BOTÃO DE VOLTAR */}
                <TouchableOpacity
                  style={styles.botaoVoltar}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.textoVoltar}>Voltar</Text>
                </TouchableOpacity>
        {listaInstituicoes.map((instituicao, index) => (
          <CardInstituicao 
            key={index.toString()} 
            Nome={instituicao.Nome}
            Endereco={instituicao.Endereco}
            Horario={instituicao.Horario}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    paddingTop: 50,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    maxWidth: 400,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: "#D62828",
    borderWidth: 0,
    borderRadius: 15,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textogrande: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  textomedio: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
  },
  botaoVoltar: {
    alignSelf: 'flex-start', 
    padding: 10,
    marginBottom: 0, 
    marginTop: 20, 
  },
  textoVoltar: {
    fontSize: 18, 
    fontWeight: '600',
    color: '#003049',
    textDecorationLine: 'underline', 
  },
});