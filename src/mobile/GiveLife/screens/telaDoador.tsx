import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Dimensions, 
  Alert,
  SafeAreaView, // Usado para melhor compatibilidade com o topo da tela
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { createClient } from "@supabase/supabase-js"; // Para lógica de Logout

// ⚠️ Configurações do Supabase (para Logout)
const SUPABASE_URL = "https://jvgwqpfouqfnwhakduei.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2Z3dxcGZvdXFmbndoYWtkdWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyOTI2ODUsImV4cCI6MjA3Nzg2ODY4NX0.fJdeZhBz6_ASOXevFhw0MpmXi2Fs7Nv5KRTI4Sexnrw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// MOCK DE DADOS 
const INSTITUICOES_MOCK = [
  {
    nome: "Instituição Ihene",
    endereco: "Rua A, 123",
    telefone: "(31) 1234-5678",
    horario: "Seg–Sex: 08h–18h",
    posicao: { latitude: -19.915, longitude: -43.93 },
    image: require('../assets/logo.png'), 
  },
  {
    nome: "Instituição Sabin",
    endereco: "Rua B, 456",
    telefone: "(31) 8765-4321",
    horario: "Seg–Sáb: 08h–17h",
    posicao: { latitude: -19.92, longitude: -43.94 },
    image: require('../assets/logo.png'), 
  },
  {
    nome: "Instituição Hermece",
    endereco: "Rua C, 789",
    telefone: "(31) 1122-3344",
    horario: "Seg–Sex: 07h–19h",
    posicao: { latitude: -19.91, longitude: -43.96 },
    image: require('../assets/logo.png'), 
  },
];

const DEPOIMENTOS_MOCK = [
  { id: 1, texto: "Nunca pensei que doar sangue seria tão acessível...", autor: "Ana", image: require('../assets/imagemPerfil.png') },
  { id: 2, texto: "Doar foi uma experiência transformadora...", autor: "Carlos", image: require('../assets/imagemPerfil.png') },
  { id: 3, texto: "Quando minha mãe precisou de uma transfusão...", autor: "Larissa", image: require('../assets/imagemPerfil.png') },
];

const MAP_CENTER = {
  latitude: -19.912998,
  longitude: -43.940933,
  latitudeDelta: 0.1, 
  longitudeDelta: 0.1, 
};


export default function TelaDoador() {
  const navigation = useNavigation();

  // Lógica de Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      Alert.alert("Sucesso", "Você foi desconectado.");
      navigation.navigate('Inicial'); // Volta para a tela inicial
    } else {
      Alert.alert("Erro", `Erro ao sair: ${error.message}`);
    }
  };

  // Componente Reutilizável da Instituição (CORRIGIDO)
  const InstituicaoCard = ({ inst }) => (
    <View style={styles.cardInstituicao}>
      {/* Substitua por sua própria imagem */}
      <View style={styles.instituicaoImagePlaceholder} /> 
      <Text style={styles.instituicaoH4}>{inst.nome}</Text>
      
      {/* Texto Corrigido: Texto aninhado dentro de um único <Text> pai */}
      <Text style={styles.instituicaoP}><Text style={{fontWeight: 'bold'}}>Endereço:</Text> {inst.endereco}</Text>
      <Text style={styles.instituicaoP}><Text style={{fontWeight: 'bold'}}>Telefone:</Text> {inst.telefone}</Text>
      <Text style={styles.instituicaoP}><Text style={{fontWeight: 'bold'}}>Horário:</Text> {inst.horario}</Text>
      
    </View>
  );

  // Componente Reutilizável do Depoimento
  const DepoimentoCard = ({ dep }) => (
    <View style={styles.depoimento}>
      {/* Substitua por sua própria imagem */}
      <View style={styles.depoimentoImagePlaceholder} />
      <View style={{ flex: 1 }}>
        <Text style={styles.depoimentoP}>"{dep.texto}"</Text>
        <Text style={styles.depoimentoSpan}>- {dep.autor}</Text>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.fundo}>
      
      {/* ========== HEADER FIXO (Topo da Tela) ========== */}
      <View style={styles.headerFixo}>
        <Text style={styles.headerTitle}>Bem-vindo, Doador!</Text>
        
        {/* Botão de Sair/Logout */}
        <TouchableOpacity 
          style={styles.btnSair}
          onPress={handleLogout}
        >
          <Text style={styles.textoSair}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* ========== CONTEÚDO PRINCIPAL (ROLÁVEL) ========== */}
      <ScrollView style={styles.conteudoScroll} contentContainerStyle={styles.conteudoContainer}>

        {/* --- Seção de Agendamento Rápido / Destaque --- */}
        <View style={styles.cardHighlight}>
          <Text style={styles.highlightTitle}>Sua Próxima Doação</Text>
          <Text style={styles.highlightText}>Aproxime-se do seu próximo agendamento e faça a diferença!</Text>
          <TouchableOpacity style={styles.btnPrimario} onPress={() => Alert.alert('Ação', 'Abrir tela de Agendamento.')}>
            <Text style={styles.btnTextoPrimario}>Agendar Doação Agora</Text>
          </TouchableOpacity>
        </View>

        {/* MAPA */}
        <View style={styles.card}>
          <Text style={styles.cardH3}>Instituições Próximas</Text>
          
          <MapView
            style={styles.mapa}
            initialRegion={MAP_CENTER}
            showsUserLocation={true} // Mostrar localização do usuário
          >
            {INSTITUICOES_MOCK.map((inst, index) => (
              <Marker
                key={index}
                coordinate={inst.posicao}
                title={inst.nome}
                description={inst.endereco}
              />
            ))}
          </MapView>
        </View>

        {/* INSTITUIÇÕES */}
        <View style={styles.card}>
          <Text style={styles.cardH3}>Locais de Doação em Destaque</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listaInstituicoesScroll}>
            {INSTITUICOES_MOCK.map((inst, index) => (
              <InstituicaoCard key={index} inst={inst} />
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.btnSecundario} onPress={() => Alert.alert('Informações', 'Abrir tela de informações.')
}>
            <Text style={styles.btnTextoSecundario}>Saiba como se preparar para doar</Text>
          </TouchableOpacity>
        </View>

        {/* DEPOIMENTOS */}
        <View style={styles.card}>
          <Text style={styles.cardH3}>Vozes da Comunidade</Text>
          <View style={styles.listaDepoimentos}>
            {DEPOIMENTOS_MOCK.map(dep => (
              <DepoimentoCard key={dep.id} dep={dep} />
            ))}
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Give Life - Todos os direitos reservados</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ===================================================================
// ESTILOS (ADAPTADOS E SIMPLIFICADOS PARA MOBILE-FIRST)
// ===================================================================
const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#f4f6f6',
  },

  // ===== HEADER FIXO (Barra Superior) =====
  headerFixo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, 
    paddingVertical: 45,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D62828',
  },
  btnSair: {
    paddingVertical: 5,
    paddingHorizontal: 13,
    borderRadius: 8,
    backgroundColor: '#D62828',
  },
  textoSair: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  // ===== CONTEÚDO ROLÁVEL =====
  conteudoScroll: {
    flex: 1,
  },
  conteudoContainer: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },

  // ===== CARDS GERAIS E ESTILOS DE TEXTO =====
  card: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardH3: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003049',
    marginBottom: 15,
  },

  // --- Card Destaque (Agendamento Rápido) ---
  cardHighlight: {
    backgroundColor: '#D62828', 
    borderRadius: 14,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  highlightTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  highlightText: {
    fontSize: 15,
    color: '#ffeeee',
    marginBottom: 15,
  },

  // ===== MAPA =====
  mapa: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 10,
  },

  // ===== BOTÕES =====
  btnPrimario: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
    marginTop: 5,
    backgroundColor: '#003049',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  btnTextoPrimario: {
    color: 'white',
    fontWeight: '600',
  },
  btnSecundario: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
    marginTop: 15,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#D62828',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  btnTextoSecundario: {
    color: '#D62828',
    fontWeight: '600',
  },

  // ===== INSTITUIÇÕES (Scroll Horizontal) =====
  listaInstituicoesScroll: {
    paddingVertical: 5,
    marginHorizontal: -5, // Compensação visual para a sombra do card
  },
  cardInstituicao: {
    width: 200, 
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#eee',
  },
  instituicaoImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#ffe9e9',
    borderRadius: 8,
    marginBottom: 10,
  },
  instituicaoH4: {
    color: '#003049',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  instituicaoP: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },

  // ===== DEPOIMENTOS =====
  listaDepoimentos: {
    gap: 15,
  },
  depoimento: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  depoimentoImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#d1d1d1',
  },
  depoimentoP: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
  depoimentoSpan: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },

  // ===== FOOTER =====
  footer: {
    backgroundColor: '#003049',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
});