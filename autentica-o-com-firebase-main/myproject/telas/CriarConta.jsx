import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import app from "../firebase/firebaseCon"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function CriarConta() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];

  const animarBotao = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const criarConta = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuário criado:", user);
        Alert.alert("Sucesso", "Conta criada com sucesso!");
        // Aqui você pode navegar ou limpar os campos, se quiser
      })
      .catch((error) => {
        console.error("Erro ao criar conta:", error);
        Alert.alert("Erro", error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.senhaContainer}>
        <TextInput
          style={styles.senhaInput}
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry={!senhaVisivel}
          value={senha}
          onChangeText={setSenha}
        />
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            onPress={() => {
              setSenhaVisivel(!senhaVisivel);
              animarBotao();
            }}
          >
            <Feather
              name={senhaVisivel ? "eye" : "eye-off"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <TouchableOpacity style={styles.botao} onPress={criarConta}>
        <Text style={styles.botaoTexto}>Criar Conta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f2",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  input: {
    borderWidth: 1,
    width: "100%",
    backgroundColor: "#f4f5f2",
    borderColor: "#ccc",
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 15,
    color: "#000",
  },
  senhaContainer: {
    borderWidth: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f5f2",
    borderColor: "#ccc",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  senhaInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
    color: "#000",
  },
  botao: {
    backgroundColor: "#344656",
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
