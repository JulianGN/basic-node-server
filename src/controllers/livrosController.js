import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const resultLivros = await livros
        .find()
        .populate("autor") // Insere o objeto autor a partir do schema respectivo
        .exec(); // use the exec() method to return a promise

      res.status(200).json(resultLivros);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao obter livros");
    }
  };

  static listarLivroPorId = async (req, res) => {
    const id = req.params.id;
    const livro = await livros.findById(id).populate("autor", "nome"); // Vai inserir o objeto autor mas apenas mostrar o campo nome

    if (!livro) {
      res.status(400).send({ message: "Livro não encontrado" });
    } else {
      res.status(200).send(livro);
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    const editora = req.query.editora;
    const livrosPorEditora = await livros.find({ editora: editora }, {});

    if (!livrosPorEditora) {
      res.status(400).send({ message: "Livro não encontrado" });
    } else {
      res.status(200).send(livrosPorEditora);
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

  static excluirLivro = async (req, res) => {
    const id = req.params.id;
    try {
      const livro = await livros.findByIdAndDelete(id);
      if (!livro) {
        res.status(404).send({ message: "Livro não encontrado" });
      } else {
        res.status(200).send({ message: "Livro excluído com sucesso" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - Falha ao atualizar livro` });
    }
  };
}

export default LivroController;
