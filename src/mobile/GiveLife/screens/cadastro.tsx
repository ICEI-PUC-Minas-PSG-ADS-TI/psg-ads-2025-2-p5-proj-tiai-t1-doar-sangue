import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { createClient } from "@supabase/supabase-js";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

const SUPABASE_URL = "https://jvgwqpfouqfnwhakduei.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2Z3dxcGZvdXFmbndoYWtkdWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyOTI2ODUsImV4cCI6MjA3Nzg2ODY4NX0.fJdeZhBz6_ASOXevFhw0MpmXi2Fs7Nv5KRTI4Sexnrw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Cadastro() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (senha && confirmar && senha !== confirmar) {
      setErro("As senhas não coincidem!");
    } else {
      setErro("");
    }
  }, [senha, confirmar]);

  const handleSignUp = async () => {
    if (!nome || !email || !senha || !confirmar) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    } else if (erro) {
      Alert.alert("Erro", erro);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: { data: { nome } },
      });

      if (error) {
        Alert.alert("Erro no cadastro", error.message);
      } else {
        Alert.alert("Sucesso!", "Verifique seu e-mail para confirmar a conta.");
        navigation.navigate("Login");
      }
    } catch (e) {
      const mensagem =
        e instanceof Error ? e.message : "Erro inesperado durante o cadastro.";
      Alert.alert("Erro inesperado", mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.fundo}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.textogrande}>Crie sua conta</Text>
        <Text style={styles.textopequeno}>
          Doe sangue, salve vidas. Juntos podemos fazer a diferença.
        </Text>

        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={24} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#fff"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#fff"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock-outline" size={24} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            placeholderTextColor="#fff"
            secureTextEntry
            value={confirmar}
            onChangeText={setConfirmar}
          />
        </View>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity
          style={[styles.botaoconfirmar, loading && { opacity: 0.7 }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textobotao}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.textoInferior}>
          Já tem uma conta?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Faça login
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "#ffffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#003049",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
  },
  textogrande: {
    fontSize: 34,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  textopequeno: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 25,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#002233",
    borderRadius: 10,
    marginVertical: 8,
    width: "100%",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingLeft: 8,
    fontSize: 16,
    height: 50,
  },
  botaoconfirmar: {
    backgroundColor: "#D62828",
    borderRadius: 12,
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  textobotao: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  erro: {
    color: "#ffcccc",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  textoInferior: {
    color: "#fff",
    fontSize: 16,
    marginTop: 20,
  },
  link: {
    color: "#FFD166",
    fontWeight: "bold",
  },
});
