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
} from "react-native";
import { createClient } from "@supabase/supabase-js";
import { useNavigation } from "@react-navigation/native"; 

// ⚠️ Nunca suba essas chaves em repositórios públicos!
const SUPABASE_URL = "https://jvgwqpfouqfnwhakduei.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2Z3dxcGZvdXFmbndoYWtkdWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyOTI2ODUsImV4cCI6MjA3Nzg2ODY4NX0.fJdeZhBz6_ASOXevFhw0MpmXi2Fs7Nv5KRTI4Sexnrw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Cadastro() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [nome, setNome] = useState("");
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

      // 1. Tenta registrar o usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: senha,
        options: { 
          data: { 
            nome, 
            role: 'doador' // Flag de perfil no metadado
          } 
        },
      });

      if (authError) {
        Alert.alert("Erro no cadastro", authError.message);
        setLoading(false);
        return;
      }
      
      const user = authData.user;

      if (user) {
        // 2. Se o Auth for bem-sucedido, insere os dados adicionais na TABELA 'usuario'
        const { error: dbError } = await supabase
          .from('usuario') 
          .insert([
            { 
              // Usa o UUID do Auth como ID na tabela usuario (Corrigido no BD)
              id: user.id, 
              nome: nome,
              email: email, 
              // Define os campos específicos para um USUÁRIO PADRÃO (Doador):
              tipopermissao: 'doador', // Usando o tipo string
              usuario_tipo: 0,         // Usando o tipo int4 (0 para doador)
              // CEP, CNPJ, Telefone, Sexo ficam NULL, conforme definido na tabela
            },
          ]);

        if (dbError) {
          // Se o banco falhar, logamos o erro.
          console.error("Erro ao salvar dados do doador na tabela 'usuario'. ID:", user.id, "Erro:", dbError.message);
          
          // O ideal é reverter o registro do Auth aqui (se for crítico)
          
          Alert.alert("Erro no Banco de Dados", "Seu usuário foi criado, mas os dados do perfil falharam ao salvar. Contate o suporte. (Erro: " + dbError.message + ")");
          setLoading(false);
          return;
        }

        // Sucesso em ambos os passos
        Alert.alert(
          "Sucesso!",
          "Cadastro realizado! Verifique seu e-mail para confirmar a conta."
        );

        setEmail("");
        setSenha("");
        setConfirmar("");
        setNome("");
      }

      setLoading(false);

    } catch (e) {
      setLoading(false);
      const mensagem =
        e instanceof Error ? e.message : "Erro inesperado durante o cadastro.";
      Alert.alert("Erro inesperado", mensagem);
    }
  };

  return (
    <View style={styles.fundo}>
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
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>
        
        <Text style={styles.textogrande}>Crie Sua Conta</Text>
        <Text style={styles.textopequeno}>
          Doe sangue, salve vidas. Juntos podemos fazer a diferença.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          onChangeText={setNome}
          placeholderTextColor="#666"
          value={nome}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={setEmail}
          placeholderTextColor="#666"
          keyboardType="email-address"
          value={email}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Senha"
          onChangeText={setSenha}
          placeholderTextColor="#666"
          value={senha}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Confirme a Senha"
          onChangeText={setConfirmar}
          placeholderTextColor="#666"
          value={confirmar}
        />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity
          style={styles.botaoconfirmar}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.textobotao}>
            {loading ? "Enviando..." : "Confirmar"}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

// -------------------------------------------------------------------
// Estilos (Mantidos)
const styles = StyleSheet.create({
  fundo: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50, 
  },
  container: {
    flex: 1,
    justifyContent: "flex-start", 
    alignItems: "center",
    width: "90%",
    maxWidth: 400,
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
  textogrande: {
    fontSize: 32,
    color: "#D62828",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 0, 
  },
  textopequeno: {
    alignSelf: "center",
    fontSize: 16,
    color: "#333", 
    textAlign: "center",
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
  erro: {
    color: "#D62828",
    fontSize: 14,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});