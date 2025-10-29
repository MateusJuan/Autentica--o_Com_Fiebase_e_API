import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Modal,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import app from "../firebase/firebaseCon"; // ajuste o caminho conforme seu projeto
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];

  // Modal de sucesso
  const [modalSucesso, setModalSucesso] = useState(false);
  const [usuarioEmail, setUsuarioEmail] = useState("");

  // Modal de erro
  const [modalErro, setModalErro] = useState(false);
  const [erroMensagem, setErroMensagem] = useState("");

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

  async function login() {
    if (!email || !senha) {
      mostrarErro("Preencha todos os campos.");
      return;
    }

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        setUsuarioEmail(user.email);
        setModalSucesso(true);

        // Limpar campos se quiser:
        setEmail("");
        setSenha("");

        setTimeout(() => {
          setModalSucesso(false);
          // Navegue para outra tela, exemplo:
          navigation.replace("ListaContatos", { user });
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        let mensagem = "Erro no login.";
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          mensagem = "Email ou senha incorretos.";
        } else if (error.code === "auth/invalid-email") {
          mensagem = "Email inválido.";
        }
        mostrarErro(mensagem);
      });
  }

  const mostrarErro = (mensagem) => {
    setErroMensagem(mensagem);
    setModalErro(true);
    setTimeout(() => setModalErro(false), 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <Text style={styles.subtitulo}>Faça login para acessar o aplicativo</Text>

      <Text style={styles.label}>EMAIL</Text>
      <TextInput
        style={styles.input}
        placeholder="testes123@gmail.com"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>SENHA</Text>
      <View style={styles.senhaContainer}>
        <TextInput
          style={styles.senhaInput}
          placeholder="******"
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

      <TouchableOpacity
        onPress={() => navigation.navigate("RecuperacaoSenha")}
        style={{ alignSelf: "flex-start" }}
      >
        <Text style={styles.esqueciSenha}>ESQUECEU A SENHA?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={login}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("CriarConta")}>
        <Text style={styles.criarConta}>CRIAR CONTA</Text>
      </TouchableOpacity>

      {/* Modal de sucesso */}
      <Modal transparent visible={modalSucesso} animationType="fade">
        <View style={styles.modalFundo}>
          <View style={[styles.modalContainer, { backgroundColor: "#4BB543" }]}>
            <Text style={styles.modalTexto}>Bem-vindo(a), {usuarioEmail}!</Text>
          </View>
        </View>
      </Modal>

      {/* Modal de erro */}
      <Modal transparent visible={modalErro} animationType="fade">
        <View style={styles.modalFundo}>
          <View style={[styles.modalContainer, { backgroundColor: "#FF4C4C" }]}>
            <Text style={styles.modalTexto}>{erroMensagem}</Text>
          </View>
        </View>
      </Modal>
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
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
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
  esqueciSenha: {
    fontSize: 11,
    color: "#444",
    marginBottom: 25,
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
  criarConta: {
    marginTop: 20,
    fontSize: 13,
    color: "#222",
    fontWeight: "500",
    letterSpacing: 1,
  },
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
