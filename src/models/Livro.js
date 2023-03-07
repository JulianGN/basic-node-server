import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editora: { type: String, required: true },
  numeroPaginas: { type: Number },
});

const livros = mongoose.model("livros", livroSchema); // aqui ele pega a collection livros e determina o schema que será utilizado nela

export default livros;
