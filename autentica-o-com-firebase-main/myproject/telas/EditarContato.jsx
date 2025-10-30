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
const API_URL = "http://localhost:3001/api/contatos";

export default function EditarContato({ route, navigation }) {
  const { contatoId } = route.params;
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState(""); 
    const [carregando, setCarregando] = useState(false);
    async function atualizarContato() {
        if (!nome || !email || !numero) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }
        try {
            setCarregando(true);
            const resposta = await fetch(`${API_URL}/${contatoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome, email, numero }),
            });
            if (!resposta.ok) {
                throw new Error("Erro ao atualizar contato.");
            }   
            Alert.alert("Sucesso", "Contato atualizado com sucesso!");
            navigation.replace("ListaContatos");
        } catch (error) {
            console.error("Erro", "Não foi possível atualizar o contato.");
        } finally {
            setCarregando(false);
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={{alignItems: 'center', marginBottom:20, backgroundColor: '#0080ff'}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 20, top: 10, margin: 8 }}>
                    <MaterialIcons name="arrow-back" size={40} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.titulo}>Editar Contato</Text>
            </View>

            <Text styles={styles.legenda}>Nome:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />

            <Text styles={styles.legenda}>Email:</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            
            <Text styles={styles.legenda}>Número:</Text>
            <TextInput
                style={styles.input}
                placeholder="Número"
                value={numero}
                onChangeText={setNumero}
            />
            <TouchableOpacity style={styles.botao} onPress={atualizarContato} disabled={carregando}>
                <Text style={styles.textoBotao}>{carregando ? "Atualizando..." : "Atualizar Contato"}</Text>
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
    },
    botao: {
        backgroundColor: '#0080ff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});