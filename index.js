const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

// URI do Railway
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

// Conecta UMA VEZ quando a API sobe
async function connectDB() {
  try {
    await client.connect();
    db = client.db("teste_db");
    console.log("✅ Conectado ao MongoDB");
  } catch (err) {
    console.error("❌ Erro ao conectar no MongoDB", err);
  }
}

connectDB();

// Rota para exibir os dados
app.get("/nomes", async (req, res) => {
  try {
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
