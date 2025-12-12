// screens/NovaSenha.jsx

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

export default function NovaSenha() {
  const navigation = useNavigation();

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async () => {
    if (!novaSenha || !confirmarSenha) {
      Alert.alert("Erro", "Por favor, preencha ambos os campos de senha.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    if (novaSenha.length < 6) { 
        Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    try {
      setLoading(true);

      // 🎯 CHAMA A FUNÇÃO DE ATUALIZAÇÃO DA SENHA DO USUÁRIO
      // Isso só funciona porque o Deep Link do Supabase já autenticou o usuário
      // temporariamente ao ser clicado.
      const { error: updateError } = await supabase.auth.updateUser({
        password: novaSenha,
      });

      setLoading(false);

      if (updateError) {
        Alert.alert("Erro na Redefinição", updateError.message);
        return;
      }

      Alert.alert(
        "Sucesso!",
        "Sua senha foi redefinida com sucesso. Agora você pode fazer login com a nova senha."
      );
      
      // Limpa os campos
      setNovaSenha('');
      setConfirmarSenha('');
      
      // Redireciona para o Login após o sucesso
      navigation.navigate('Login'); 

    } catch (e) {
      setLoading(false);
      const mensagem =
        e instanceof Error ? e.message : "Erro inesperado ao redefinir a senha.";
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

        <Text style={styles.textogrande}>Crie Sua Nova Senha</Text>
        <Text style={styles.textopequeno}>
          Defina uma nova senha forte para sua conta.
        </Text>

        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Nova Senha (Mínimo 6 caracteres)"
          onChangeText={setNovaSenha}
          placeholderTextColor="#666"
          value={novaSenha}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Confirme a Nova Senha"
          onChangeText={setConfirmarSenha}
          placeholderTextColor="#666"
          value={confirmarSenha}
        />

        <TouchableOpacity
          style={styles.botaoconfirmar}
          onPress={handlePasswordUpdate}
          disabled={loading}
        >
          <TouchableOpacity
  style={styles.botaoconfirmar}
  onPress={handlePasswordUpdate}
  disabled={loading}
>
  {loading ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={styles.textobotao}>Redefinir Senha</Text>
  )}
</TouchableOpacity>

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
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    maxWidth: 400,
    paddingTop: 20,
  },
  textogrande: {
    fontSize: 32,
    color: "#D62828", 
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: 'flex-start',
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