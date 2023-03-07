import express from "express";
import db from "./config/dbConnect.js";
import livros from "./models/Livro.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json()); // Interpretar o que chga via json

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node com Express");
});

app.get("/livros", async (req, res) => {
  try {
    const resultLivros = await livros.find().exec(); // use the exec() method to return a promise
    res.status(200).json(resultLivros);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao obter livros");
  }
});

app.get("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);

  res.json(livros[index]);
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);

  if (index >= 0) livros[index].titulo = req.body.titulo;
  else res.json(livros);
});

app.delete("/livros/:id", (req, res) => {
  const { id } = req.params;
  const index = buscaLivro(id);
  livros.splice(index, 1);

  res.send(`Livro ${id} removido com sucesso`);
});

function buscaLivro(id) {
  return livros.findIndex((l) => l.id == id);
}

export default app;
