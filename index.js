const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

// URI vem do Railway (Variables)
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI não definida");
  process.exit(1);
}

const client = new MongoClient(uri);

app.get("/", async (req, res) => {
  try {
    // tenta conectar
    await client.connect();

    // pega o banco (nome qualquer)
    const db = client.db("teste_db");

    // comando simples só pra validar
    await db.command({ ping: 1 });

    res.send("✅ API rodando e MongoDB conectado com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Erro ao conectar no MongoDB");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
