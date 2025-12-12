// screens/login.tsx

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
  SafeAreaView,
} from "react-native";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { createClient } from "@supabase/supabase-js";
import { useNavigation } from "@react-navigation/native"; 
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
// ⚠️ Seus dados de conexão do Supabase
const SUPABASE_URL = "https://jvgwqpfouqfnwhakduei.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2Z3dxcGZvdXFmbndoYWtkdWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyOTI2ODUsImV4cCI6MjA3Nzg2ODY4NX0.fJdeZhBz6_ASOXevFhw0MpmXi2Fs7Nv5KRTI4Sexnrw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Login() {
  const navigation =
       useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha o e-mail e a senha.");
      return;
    }

    try {
      setLoading(true);

      // Chama a função de login do Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) {
        // O Supabase retorna mensagens úteis para senhas incorretas, etc.
        Alert.alert("Erro no Login", error.message);
        return;
      }
      
      // Sucesso no login
      Alert.alert("Sucesso!", "Login realizado com sucesso!");
      navigation.navigate('TelaDoador'); 

    } catch (e) {
      const mensagem =
        e instanceof Error ? e.message : "Erro inesperado durante o login.";
      Alert.alert("Erro inesperado", mensagem);
    } finally {
      setLoading(false);
    }
  };

  const goToForgotPassword = () => {
    // 🎯 Navega para a tela de solicitação de redefinição
    navigation.navigate('EsqueciSenha'); 
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
          disabled={loading}
        >
          <Text style={styles.textoVoltar}>{"Voltar"}</Text>
        </TouchableOpacity>

        <Text style={styles.textogrande}>Bem-vindo de Volta!</Text>
        <Text style={styles.textopequeno}>
          Entre para continuar salvando vidas.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={setEmail}
          placeholderTextColor="#666"
          keyboardType="email-address"
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Senha"
          onChangeText={setSenha}
          placeholderTextColor="#666"
          value={senha}
        />

        {/* LINK DE ESQUECI MINHA SENHA */}
        <TouchableOpacity 
          style={styles.forgotPasswordButton} 
          onPress={goToForgotPassword}
          disabled={loading}
        >
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoconfirmar}
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.textobotao}>
            {loading ? <ActivityIndicator size="small" color="#fff" /> : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Link para cadastro de doador (retorna à tela inicial ou vai para cadastro) */}
        <TouchableOpacity
          style={styles.linkCadastro}
          onPress={() => navigation.navigate('Cadastro')}
          disabled={loading}
        >
          <Text style={styles.linkCadastroText}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// -------------------------------------------------------------------
// Estilos
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
    marginTop: 50, 
  },
  textoVoltar: {
    fontSize: 18, 
    fontWeight: '600',
    color: '#003049',
    textDecorationLine: 'underline',
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    padding: 5,
    marginTop: 5,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#003049',
    textDecorationLine: 'underline',
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
  linkCadastro: {
    marginTop: 20,
    padding: 10,
  },
  linkCadastroText: {
    color: "#003049",
    fontSize: 16,
    textDecorationLine: 'underline',
  }
});
