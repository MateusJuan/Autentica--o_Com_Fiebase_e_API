import { useEffect, useState } from "react";
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    Animated, 
    Modal, 
    Alert
} from "react-native";
import { Feather } from "@expo/vector-icons";
import app from "../firebase/firebaseCon";
import { getAuth, signOut } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";

const API_URL = "http://localhost:3001/api/contatos";

export default function ListaContatos({ navigation }) {
  const [contatos, setContatos] = useState([]);

  const [carregando, setCarregando] = useState(true);

  // Função para buscar contatos da API
  useEffect(() => {
    buscrarContatos();
  }, []);

  async function buscrarContatos() {
    try {
      setCarregando(true);
      const resposta = await fetch(API_URL);
      const data = await resposta.json();
      setContatos(data);
    } catch (error) {
      console.error("Erro", "Não foi possível carregar os contatos.");
    } finally {
      setCarregando(false);
    }
  }

  return(
    <SafeAreaView style={styles.container}>
        <View style={{alignItems: 'center', marginBottom:20, backgroundColor: '#0080ff'}}>
            <Text style={styles.titulo}>Lista de Contatos</Text>
              <TouchableOpacity style={{position: 'absolute', right: 20, top: 10, margin:8}} onPress={() => navigation.navigate('CriarContato')}>
                <MaterialIcons 
                name="add" 
                size={40} 
                color="#ffffff" 
                />
              </TouchableOpacity>
        </View>
      {contatos.map((contato) => (
        <TouchableOpacity key={contato.id} onPress={() => navigation.navigate('EditarContato', { contatoId: contato.id })}>
          <View key={contato.id} style={styles.contatoContainer}>
            <Text style={styles.nome}>{contato.nome}</Text>
            <Text style={styles.telefone}>{contato.numero}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    },
    titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
    color: '#ffffffff',
    },
    contatoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    },
    nome: {
    fontSize: 18,
    fontWeight: '600',
    },
    telefone: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
    },
});