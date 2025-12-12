// screens/esqueciSenha.tsx

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
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { createClient } from "@supabase/supabase-js";
import { useNavigation } from "@react-navigation/native";

// ⚠️ Seus dados de conexão do Supabase
const SUPABASE_URL = "https://jvgwqpfouqfnwhakduei.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2Z3dxcGZvdXFmbndoYWtkdWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyOTI2ODUsImV4cCI6MjA3Nzg2ODY4NX0.fJdeZhBz6_ASOXevFhw0MpmXi2Fs7Nv5KRTI4Sexnrw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Função auxiliar para validação de e-mail
const isValidEmail = (email:string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default function EsqueciSenha() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email || !isValidEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.");
      return;
    }

    try {
      setLoading(true);

      // 🎯 CHAMADA CRÍTICA: Usa o Deep Link configurado no App.js e no painel do Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'givlife://reset-password', 
      });

      setLoading(false);

      if (error) {
        // Logar o erro interno, mas dar a mensagem genérica ao usuário por segurança
        console.error("Erro ao solicitar redefinição:", error.message);
      }

      // Mensagem de sucesso/genérica (sem confirmar se o e-mail existe, por segurança)
      Alert.alert(
        "E-mail Enviado!",
        "Se este e-mail estiver cadastrado, você receberá um link para redefinir sua senha. Verifique sua caixa de spam e siga as instruções."
      );
      
      setEmail("");
      navigation.goBack();

    } catch (e) {
      setLoading(false);
      const mensagem =
        e instanceof Error ? e.message : "Erro inesperado durante a solicitação.";
      Alert.alert("Erro inesperado", mensagem);
    }
  };

  return (
    <SafeAreaView style={styles.fundo}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 20}
      >
        {/* BOTÃO DE VOLTAR */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoVoltar}>{"Voltar"}</Text>
        </TouchableOpacity>

        <Text style={styles.textogrande}>Esqueceu a Senha?</Text>
        <Text style={styles.textopequeno}>
          Insira seu e-mail de cadastro abaixo e enviaremos um link seguro para você redefinir sua senha.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail de Cadastro"
          onChangeText={setEmail}
          placeholderTextColor="#666"
          keyboardType="email-address"
          value={email}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.botaoconfirmar}
          onPress={handlePasswordReset}
          disabled={loading}
        >
          <Text style={styles.textobotao}>
            {loading ? <ActivityIndicator size="small" color="#fff" /> : "Enviar Link de Redefinição"}
          </Text>
        </TouchableOpacity>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// -------------------------------------------------------------------
// Estilos (Reutilizando seu padrão)
const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start", 
    alignItems: "center",
    width: "90%",
    maxWidth: 400,
    paddingTop: 20,
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
  },
  textogrande: {
    fontSize: 32,
    color: "#D62828", 
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  textopequeno: {
    alignSelf: "flex-start", 
    fontSize: 16,
    color: "#333", 
    textAlign: "left",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    color: "#003049",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 1,
  },
  botaoconfirmar: {
    backgroundColor: "#D62828", 
    borderWidth: 0,
    borderRadius: 30,
    width: "100%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textobotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});