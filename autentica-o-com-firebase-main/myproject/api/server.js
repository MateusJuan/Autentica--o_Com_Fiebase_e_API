import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import cors from "cors";

const app = express();
const PORT = 3000;

// Configurações
app.use(cors());
app.use(express.json());

// Conexão com o "banco" JSON
const adapter = new JSONFile("db.json");
const db = new Low(adapter, { contatos: [] });
await db.read();

// ============ ROTAS ============

// Listar todos os contatos
app.get("/api/contatos", async (req, res) => {
  await db.read();
  res.json(db.data.contatos);
});

// Criar novo contato
app.post("/api/contatos", async (req, res) => {
  const { nome, email, numero } = req.body;

  if (!nome || !email || !numero) {
    return res.status(400).json({ error: "Campos nome, email e numero são obrigatórios." });
  }

  const novoContato = {
    id: Date.now(),
    nome,
    email,
    numero,
  };

  db.data.contatos.push(novoContato);
  await db.write();

  res.status(201).json(novoContato);
});

// Atualizar contato
app.put("/api/contatos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, numero } = req.body;

  await db.read();
  const contato = db.data.contatos.find((c) => c.id == id);

  if (!contato) return res.status(404).json({ error: "Contato não encontrado." });

  contato.nome = nome || contato.nome;
  contato.email = email || contato.email;
  contato.numero = numero || contato.numero;

  await db.write();
  res.json(contato);
});

// Deletar contato
app.delete("/api/contatos/:id", async (req, res) => {
  const { id } = req.params;
  await db.read();

  db.data.contatos = db.data.contatos.filter((c) => c.id != id);
  await db.write();

  res.json({ message: "Contato removido com sucesso." });
});

// ===============================

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
