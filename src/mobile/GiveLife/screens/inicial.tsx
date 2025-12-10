import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import Cadastro from "./cadastro";
import Login from "./login";
import CadastroParceiro from "./cadastroInstituicao";

const carouselData = [
  {
    id: "1",
    title: "Conectamos sua doação",
    text: "Encontre o hemocentro mais próximo e salve uma vida hoje.",
    backgroundColor: "#D62828",
  },
  {
    id: "2",
    title: "Faça a diferença",
    text: "Acompanhe as necessidades dos bancos de sangue da sua região.",
    backgroundColor: "#003049",
  },
  {
    id: "3",
    title: "Agendamento Fácil",
    text: "Marque sua doação de forma rápida, segura e sem burocracia.",
    backgroundColor: "#D62828",
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const itemWidth = SCREEN_WIDTH;
  const interval = 6000;

  useEffect(() => {
    const startProgressAnimation = () => {
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: interval,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    };

    startProgressAnimation();

    const timer = setInterval(() => {
      let nextIndex = (activeIndex + 1) % carouselData.length;
      setActiveIndex(nextIndex);
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          x: nextIndex * itemWidth,
          y: 0,
          animated: true,
        });
      }
      startProgressAnimation();
    }, interval);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / itemWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={carouselStyles.carouselContainer}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        contentOffset={{ x: 0, y: 0 }}
        style={{ width: SCREEN_WIDTH }}
      >
        {carouselData.map((item, index) => (
          <View
            key={item.id}
            style={[carouselStyles.slideWrapper, { width: SCREEN_WIDTH }]}
          >
            <View
              style={[
                carouselStyles.slide,
                { backgroundColor: item.backgroundColor },
              ]}
            >
              <Text style={carouselStyles.slideTitle}>{item.title}</Text>
              <Text style={carouselStyles.slideText}>{item.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={carouselStyles.indicatorContainer}>
        {carouselData.map((_, index) => (
          <View key={index} style={carouselStyles.dotWrapper}>
            <View style={carouselStyles.dotBackground} />
            
            {activeIndex === index ? (
              <Animated.View
                style={[
                  carouselStyles.progressBar,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            ) : (
              <View
                style={[
                  carouselStyles.progressBar,
                  {
                    width: activeIndex > index ? "100%" : "0%",
                    backgroundColor: "#003049",
                  },
                ]}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const carouselStyles = StyleSheet.create({
  carouselContainer: {
    height: 200,
    marginBottom: 30,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  slideWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  slide: {
    width: "100%",
    borderRadius: 15,
    padding: 20,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  slideTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  slideText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    marginTop: 15,
    height: 3,
    width: "80%",
    justifyContent: "center",
  },
  dotWrapper: {
    flex: 1,
    height: 3,
    marginHorizontal: 3,
    borderRadius: 1.5,
    overflow: "hidden",
    backgroundColor: "#ccc",
  },
  dotBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 3,
    width: "100%",
    backgroundColor: "#ccc",
  },
  progressBar: {
    height: 3,
    backgroundColor: "#003049",
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default function Inicial() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.fundo}>
      <View style={styles.container}>
        <Carousel />
        
        <View style={styles.topo}>
          <Text style={styles.textogrande}>Olá!</Text>
          <Text style={styles.textopequeno}>Faça login ou crie sua conta</Text>
        </View>

        <View style={styles.botoesWrapper}>
          <View style={styles.botoesContainer}>
            <TouchableOpacity
              style={styles.botaocadastro}
              onPress={() => {
                navigation.navigate("Cadastro");
              }}
            >
              <Text style={styles.textobotaoPrincipal}>Cadastre-se</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaologin}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.textobotaoSecundario}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.textoparceiro}>
              Quer ser um dos nossos parceiros?
            </Text>

            <TouchableOpacity
              style={styles.botaologin}
              onPress={() => {
                navigation.navigate("CadastroInstituicao");
              }}
            >
              <Text style={styles.textobotaoSecundario}>Seja parceiro</Text>
            </TouchableOpacity>
            {/*BOTÃO PARA TESTES*/}
            <TouchableOpacity
              style={styles.botaologin}
              onPress={() => {
                navigation.navigate("Instituicao");
              }}
            >
              <Text style={styles.textobotaoSecundario}>Pular Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
  },
  topo: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textogrande: {
    fontSize: 36,
    color: "#D62828",
    fontWeight: "bold",
    marginBottom: 5,
  },
  textopequeno: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  botoesWrapper: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  botoesContainer: {
    width: "100%",
    alignItems: "center",
  },
  botaocadastro: {
    backgroundColor: "#D62828",
    borderRadius: 30,
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  botaologin: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "#D62828",
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  textobotaoPrincipal: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textobotaoSecundario: {
    color: "#D62828",
    fontSize: 18,
    fontWeight: "bold",
  },
  textoparceiro: {
    fontSize: 14,
    color: "#666",
    marginTop: 15,
    marginBottom: 10,
  },
});