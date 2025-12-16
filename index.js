const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 👉 USE A VARIÁVEL PADRÃO DO RAILWAY
const uri = process.env.MONGO_PUBLIC_URL;

if (!uri) {
  console.error("❌ MONGODB_URI não definida");
  process.exit(1);
}

const client = new MongoClient(uri);
let db;

// Conecta UMA VEZ
async function connectDB() {
  try {
    await client.connect();
    db = client.db("test");
    console.log("✅ Conectado ao MongoDB");
  } catch (err) {
    console.error("❌ Erro ao conectar no MongoDB", err);
  }
}

connectDB();

// Rota para exibir os dados
app.get("/nomes", async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ erro: "Banco não conectado ainda" });
    }

    const nomes = await db
      .collection("nomes")
      .find({})
      .toArray();

    res.json(nomes);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar nomes" });
  }
});

// Rota teste
app.get("/", (req, res) => {
  res.send("🚀 API rodando com MongoDB");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
