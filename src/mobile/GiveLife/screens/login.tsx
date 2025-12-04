import React, { useState } from "react";
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

export default function Login() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha E-mail e Senha.");
      return;
    }

    setErro("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) {
        setErro(error.message);
        Alert.alert("Erro no Login", error.message);
      } else if (data.user) {
        Alert.alert("Sucesso!", `Bem-vindo(a), ${data.user.email}!`);
        setEmail("");
        setSenha("");
        navigation.navigate("Home");
      }
    } catch (e) {
      const mensagem =
        e instanceof Error ? e.message : "Erro inesperado durante o login.";
      setErro(mensagem);
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
        <Text style={styles.textogrande}>Bem-vindo de volta!</Text>
        <Text style={styles.textopequeno}>Entre em sua conta</Text>

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

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity
          style={[styles.botaoconfirmar, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textobotao}>Entrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.textoInferior}>
          Não tem uma conta?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Cadastro")}
          >
            Cadastre-se
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
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  textopequeno: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 30,
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
