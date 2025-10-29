import { useEffect, useState } from "react";
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Modal, 
  Alert, 
  ActivityIndicator 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const API_URL = "http://localhost:3001/api/contatos";

export default function ListaContatos({ navigation }) {
  const [contatos, setContatos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Estado para o modal
  const [modalVisible, setModalVisible] = useState(false);
  const [contatoSelecionado, setContatoSelecionado] = useState(null);

  useEffect(() => {
    buscarContatos();
  }, []);

  async function buscarContatos() {
    try {
      setCarregando(true);
      const resposta = await fetch(API_URL);
      const data = await resposta.json();
      setContatos(data);
    } catch (error) {
      console.error("Erro ao carregar contatos:", error);
      Alert.alert("Erro", "Não foi possível carregar os contatos.");
    } finally {
      setCarregando(false);
    }
  }

      async function excluirContato(id) {
      Alert.alert(
        "Excluir contato",
        "Tem certeza que deseja excluir este contato?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Excluir",
            onPress: async () => {
              try {
                const url = `${API_URL}/${id}`;
                console.log("➡️ Deletando contato na URL:", url);

                const resposta = await fetch(url, { method: "DELETE" });

                if (!resposta.ok) {
                  console.log("❌ Erro HTTP:", resposta.status);
                  const erro = await resposta.text();
                  console.log("⚠️ Resposta do servidor:", erro);
                  throw new Error(`Erro ao excluir contato: ${resposta.status}`);
                }

                Alert.alert("Sucesso", "Contato excluído com sucesso!");
                setModalVisible(false);
                buscarContatos(); // atualiza lista
              } catch (error) {
                console.error("❌ Erro ao excluir:", error);
                Alert.alert("Erro", "Não foi possível excluir o contato. Verifique o console.");
              }
            },
            style: "destructive",
          },
        ]
      );
    }

  function abrirModal(contato) {
    setContatoSelecionado(contato);
    setModalVisible(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 20, backgroundColor: "#0080ff" }}>
        <Text style={styles.titulo}>Lista de Contatos</Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 20, top: 10, margin: 8 }}
          onPress={() => navigation.navigate("CriarContato")}
        >
          <MaterialIcons name="add" size={40} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#0080ff" style={{ marginTop: 20 }} />
      ) : contatos.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 40 }}>Nenhum contato encontrado.</Text>
      ) : (
        contatos.map((contato) => (
          <TouchableOpacity key={contato.id} onPress={() => abrirModal(contato)}>
            <View style={styles.contatoContainer}>
              <Text style={styles.nome}>{contato.nome}</Text>
              <Text style={styles.telefone}>{contato.numero}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}

      {/* MODAL DE AÇÕES */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Contato</Text>

            {contatoSelecionado && (
              <>
                <Text style={styles.modalNome}>{contatoSelecionado.nome}</Text>
                <Text style={styles.modalEmail}>{contatoSelecionado.email}</Text>
                <Text style={styles.modalTelefone}>{contatoSelecionado.numero}</Text>
              </>
            )}

            <TouchableOpacity
              style={[styles.botao, { backgroundColor: "#0080ff" }]}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("EditarContato", { contatoId: contatoSelecionado.id });
              }}
            >
              <Text style={styles.textoBotao}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, { backgroundColor: "red" }]}
              onPress={() => excluirContato(contatoSelecionado.id)}
            >
              <Text style={styles.textoBotao}>Excluir</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.fechar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
    color: "#ffffff",
  },
  contatoContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nome: {
    fontSize: 18,
    fontWeight: "600",
  },
  telefone: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalNome: {
    fontSize: 18,
    fontWeight: "600",
  },
  modalEmail: {
    fontSize: 16,
    color: "#555",
  },
  modalTelefone: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  botao: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fechar: {
    color: "#0080ff",
    fontSize: 16,
    marginTop: 10,
  },
});
