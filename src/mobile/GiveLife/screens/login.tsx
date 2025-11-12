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
} from "react-native";
import { createClient } from "@supabase/supabase-js";

// ⚠️ Nunca suba essas chaves em repositórios públicos!
const SUPABASE_URL = "https://jvgwqpfouqfnwhakduei.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2Z3dxcGZvdXFmbndoYWtkdWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyOTI2ODUsImV4cCI6MjA3Nzg2ODY4NX0.fJdeZhBz6_ASOXevFhw0MpmXi2Fs7Nv5KRTI4Sexnrw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Login() {
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
        email: email,
        password: senha,
      });

      setLoading(false);

      if (error) {
        setErro(error.message);
        Alert.alert("Erro no Login", error.message);
        return;
      }

      if (data.user) {
        Alert.alert("Sucesso!", `Bem-vindo(a), ${data.user.email}!`);
        setEmail("");
        setSenha("");
        // Implementar navegação aqui
      }
    } catch (e) {
      setLoading(false);
      const mensagem =
        e instanceof Error ? e.message : "Erro inesperado durante o login.";
      setErro(mensagem);
      Alert.alert("Erro inesperado", mensagem);
    }
  };

  return (
    <View style={styles.fundo}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <Text style={styles.textogrande}>Login</Text>
        <Text style={styles.textopequeno}>Entre em sua conta</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={setEmail}
          placeholderTextColor="#fff"
          value={email}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Senha"
          onChangeText={setSenha}
          placeholderTextColor="#fff"
          value={senha}
        />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity
          style={styles.botaoconfirmar}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.textobotao}>
            {loading ? "Entrando..." : "Login"}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  textogrande: {
    fontSize: 50,
    color: "#003049",
    fontWeight: "bold",
  },
  textopequeno: {
    alignSelf: "center",
    fontSize: 22,
    color: "#003049",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: 377,
    height: 55,
    backgroundColor: "#003049",
    color: "#fff",
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  botaoconfirmar: {
    backgroundColor: "#D62828",
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#fff",
    width: 208,
    height: 53,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  textobotao: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  erro: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
});
