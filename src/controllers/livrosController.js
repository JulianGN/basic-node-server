import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const resultLivros = await livros.find().exec(); // use the exec() method to return a promise
      res.status(200).json(resultLivros);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao obter livros");
    }
  };

  static listarLivroPorId = async (req, res) => {
    const id = req.params.id;
    const livro = await livros.findById(id);

    if (!livro) {
      res.status(400).send({ message: "Livro não encontrado" });
    } else {
      res.status(200).send(livro);
    }
  };

  static cadastrarLivro = async (req, res) => {
    const livro = new livros(req.body);

    try {
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (err) {
      res
        .status(500)
        .send({ message: `${err.message} - Falha ao cadastrar livro` });
    }
  };

  static atualizarLivro = async (req, res) => {
    const id = req.params.id;
    try {
      const livro = await livros.findByIdAndUpdate(id, { $set: req.body });
      if (!livro) {
        res.status(404).send({ message: "Livro não encontrado" });
      } else {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - Falha ao atualizar livro` });
    }
  };
}

export default LivroController;
