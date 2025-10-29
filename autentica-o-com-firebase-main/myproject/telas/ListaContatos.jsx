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
    Alert
} from "react-native";
import { Feather } from "@expo/vector-icons";
import app from "../firebase/firebaseCon";
import { getAuth, signOut } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";

export default function ListaContatos({ navigation }) {
  const [contatos, setContatos] = useState([
    { id: '1', nome: 'João Silva', telefone: '(11) 91234-5678' },
    { id: '2', nome: 'Maria Oliveira', telefone: '(21) 92345-6789' },
    { id: '3', nome: 'Carlos Souza', telefone: '(31) 93456-7890' },
  ]);

  return(
    <SafeAreaView style={styles.container}>
        <View style={{alignItems: 'center', marginBottom: 20, backgroundColor: '#0080ff'}}>
            <Text style={styles.titulo}>Lista de Contatos</Text>
            <MaterialIcons 
                name="add" 
                size={40} 
                color="#ffffff" 
            />
        </View>
      {contatos.map((contato) => (
        <View key={contato.id} style={styles.contatoContainer}>
          <Text style={styles.nome}>{contato.nome}</Text>
          <Text style={styles.telefone}>{contato.telefone}</Text>
        </View>
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
    marginBottom: 20,
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