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
export default function CriarContato({ navigation }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState(""); 
    const [carregando, setCarregando] = useState(false);

    async function criarNovoContato() {
        if (!nome || !email || !numero) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }
        try {
            setCarregando(true);
            const resposta = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome, email, numero }),
            });
            if (!resposta.ok) {
                throw new Error("Erro ao criar contato.");
            }
            Alert.alert("Sucesso", "Contato criado com sucesso!");
            navigation.replace("ListaContatos");
        } catch (error) {
            console.error("Erro", "Não foi possível criar o contato.");
        } finally {
            setCarregando(false);
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={{alignItems: 'center', marginBottom:20, backgroundColor: '#0080ff'}}>
                <Text style={styles.titulo}>Criar Novo Contato</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Número de Telefone"
                value={numero}
                onChangeText={setNumero}
                keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.botao} onPress={criarNovoContato} disabled={carregando}>
                <Text style={styles.textoBotao}>{carregando ? "Criando..." : "Criar Contato"}</Text>
            </TouchableOpacity>
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
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    }, 
    botao: {
        backgroundColor: '#0080ff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});