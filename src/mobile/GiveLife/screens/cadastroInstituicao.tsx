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
  ScrollView,
} from "react-native";
import { createClient } from "@supabase/supabase-js";
import { useNavigation } from "@react-navigation/native"; 

// ⚠️ Nunca suba essas chaves em repositórios públicos!
const SUPABASE_URL = "https://jvgwqpfouqfnwhakduei.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2Z3dxcGZvdXFmbndoYWtkdWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyOTI2ODUsImV4cCI6MjA3Nzg2ODY4NX0.fJdeZhBz6_ASOXevFhw0MpmXi2Fs7Nv5KRTI4Sexnrw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Funções de Validação (Mantidas) ---

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isPasswordStrong = (password) => {
  // 1. Checa por repetições (5 ou mais do mesmo caractere)
  if (/(.)\1{4,}/.test(password)) {
    return "A senha é muito fraca. Evite usar 5 ou mais caracteres iguais seguidos.";
  }

  // 2. Checa por sequências numéricas (4 ou mais)
  const numSequences = /(\d{4,})/.exec(password);
  if (numSequences) {
    const sequence = numSequences[0];
    if (sequence.length >= 4) {
      for (let i = 0; i <= sequence.length - 4; i++) {
        const sub = sequence.substring(i, i + 4);
        if (
          "0123456789".includes(sub) || 
          "9876543210".includes(sub)
        ) {
          return "A senha é muito fraca. Evite sequências numéricas (ex: 1234 ou 4321).";
        }
      }
    }
  }

  // 3. Checa por sequências alfabéticas (4 ou mais)
  const alpha = "abcdefghijklmnopqrstuvwxyz";
  const reversedAlpha = alpha.split('').reverse().join('');
  const lowerCasePass = password.toLowerCase();
  
  if (lowerCasePass.length >= 4) {
    for (let i = 0; i <= lowerCasePass.length - 4; i++) {
      const sub = lowerCasePass.substring(i, i + 4);
      if (
        alpha.includes(sub) || 
        reversedAlpha.includes(sub)
      ) {
        return "A senha é muito fraca. Evite sequências alfabéticas (ex: abcd ou dcba).";
      }
    }
  }

  return null; 
};


export default function CadastroParceiro() {
  const navigation = useNavigation();

  // Campos de estado
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cep, setCep] = useState("");

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  // Lógica para conferir senhas e checar tamanho (mínimo 8)
  useEffect(() => {
    if (senha && confirmar && senha !== confirmar) {
      setErro("As senhas não coincidem!");
    } else if (senha && senha.length < 8) { 
        setErro("A senha deve ter no mínimo 8 caracteres.");
    } else {
      setErro("");
    }
  }, [senha, confirmar]);
  
  // Função de máscara de CNPJ
  const maskCnpj = (value) => {
    let masked = value.replace(/\D/g, "");
    masked = masked.replace(/^(\d{2})(\d)/, "$1.$2");
    masked = masked.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    masked = masked.replace(/\.(\d{3})(\d)/, ".$1/$2");
    masked = masked.replace(/(\d{4})(\d)/, "$1-$2");
    return masked.substring(0, 18);
  };
  
  // Função de máscara de CEP
  const maskCep = (value) => {
    let masked = value.replace(/\D/g, "");
    masked = masked.replace(/^(\d{5})(\d)/, "$1-$2");
    return masked.substring(0, 9);
  };

  const handleSignUp = async () => {
    
    // --- Validações (Mantidas) ---
    const requiredFields = [nome, email, senha, confirmar, cnpj, cep];
    if (requiredFields.some(field => !field)) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    } 
    
    if (erro) {
      Alert.alert("Erro", erro);
      return;
    }
    
    const passwordError = isPasswordStrong(senha);
    if (passwordError) {
        Alert.alert("Erro de Segurança", passwordError);
        return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Erro", "E-mail inválido. Verifique o formato.");
      return;
    }

    const cleanedCnpj = cnpj.replace(/\D/g, '');
    if (cleanedCnpj.length !== 14) {
      Alert.alert("Erro", "CNPJ inválido. Ele deve conter 14 dígitos.");
      return;
    }

    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length !== 8) {
      Alert.alert("Erro", "CEP inválido. Ele deve conter 8 dígitos.");
      return;
    }
    // --- Fim das Validações ---

    try {
      setLoading(true);

      // 1. Tenta registrar o usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: senha,
        options: { 
          data: { 
            role: 'parceiro', // Flag de perfil no metadado
          } 
        },
      });

      if (authError) {
        let errorMessage = authError.message;
        if (errorMessage.includes("Password should be at least 6 characters")) {
            errorMessage = "A senha deve ter no mínimo 8 caracteres."; 
        } else if (errorMessage.includes("User already registered")) {
            errorMessage = "Este e-mail já está cadastrado."; 
        }
        Alert.alert("Erro no cadastro", errorMessage);
        setLoading(false);
        return;
      }

      const user = authData.user;
      
      if (user) {
        // 2. Se o Auth for bem-sucedido, insere os dados adicionais na TABELA 'usuario'
        const { error: dbError } = await supabase
          .from('usuario') // <--- USANDO A TABELA EXISTENTE 'usuario'
          .insert([
            { 
              id: user.id, // Chave Primária deve ser o ID do Auth
              nome: nome, // Usando o nome da instituição como nome principal no registro
              email: email, // Opcional, mas útil para consulta
              cnpj: cleanedCnpj,
              cep: cleanedCep,
              // DEFINIÇÕES ESPECÍFICAS PARA PARCEIRO:
              tipopermissao: 'parceiro', // Exemplo: 'parceiro'
              usuario_tipo: 1, // Exemplo: 1 (se 0 for doador, 1 for parceiro)
            },
          ]);

        if (dbError) {
          console.error("Erro ao salvar dados do parceiro na tabela 'usuario'. ID:", user.id, "Erro:", dbError.message);
          
          Alert.alert("Erro no Banco de Dados", "Seu usuário foi criado, mas os dados do parceiro falharam ao salvar. Contate o suporte. (Erro: " + dbError.message + ")");
          setLoading(false);
          return;
        }
        
        // 3. Sucesso em ambos os passos
        Alert.alert(
          "Sucesso!",
          "Cadastro de Parceiro realizado! Verifique seu e-mail para confirmar a conta."
        );
        // Limpar campos
        setEmail("");
        setSenha("");
        setConfirmar("");
        setNome("");
        setCnpj("");
        setCep("");
      }
      setLoading(false);

    } catch (e) {
      setLoading(false);
      const mensagem =
        e instanceof Error ? e.message : "Erro inesperado durante o cadastro de parceiro.";
      Alert.alert("Erro inesperado", mensagem);
    }
  };

  return (
    <View style={styles.fundo}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 20}
      >
        <ScrollView contentContainerStyle={styles.container}>
          
          {/* BOTÃO DE VOLTAR COM TRATAMENTO DE GO_BACK */}
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('Inicial'); 
              }
            }}
          >
            <Text style={styles.textoVoltar}>Voltar</Text>
          </TouchableOpacity>
          
          <Text style={styles.textogrande}>Cadastro Parceiro</Text>
          <Text style={styles.textopequeno}>
            Registre sua instituição e comece a impactar vidas.
          </Text>

          {/* CAMPOS DE INPUT */}
          <TextInput
            style={styles.input}
            placeholder="Nome da Instituição"
            onChangeText={setNome}
            placeholderTextColor="#666"
            value={nome}
          />
          <TextInput
            style={styles.input}
            placeholder="CNPJ"
            onChangeText={(text) => setCnpj(maskCnpj(text))}
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={cnpj}
            maxLength={18} 
          />
          <TextInput
            style={styles.input}
            placeholder="CEP"
            onChangeText={(text) => setCep(maskCep(text))}
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={cep}
            maxLength={9} 
          />
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
            placeholder="Senha (mínimo 8 caracteres)" 
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

          {/* BOTÃO DE CONFIRMAR */}
          <TouchableOpacity
            style={styles.botaoconfirmar}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.textobotao}>
              {loading ? "Registrando..." : "Confirmar Cadastro"}
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// Estilos mantidos (Omitidos para brevidade, mas devem ser incluídos)
const styles = StyleSheet.create({
  fundo: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50, 
  },
  keyboardContainer: {
    flex: 1, 
    width: '100%',
  },
  container: {
    alignItems: "center",
    paddingHorizontal: '5%',
    paddingBottom: 40,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
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