import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const resultAutores = await autores.find().exec(); // use the exec() method to return a promise
      res.status(200).json(resultAutores);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao obter autores");
    }
  };

  static listarAutorPorId = async (req, res) => {
    const id = req.params.id;
    const autor = await autores.findById(id);

    if (!autor) {
      res.status(400).send({ message: "Autor não encontrado" });
    } else {
      res.status(200).send(autor);
    }
  };

  static cadastrarAutor = async (req, res) => {
    const autor = new autores(req.body);

    try {
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (err) {
      res
        .status(500)
        .send({ message: `${err.message} - Falha ao cadastrar autor` });
    }
  };

  static atualizarAutor = async (req, res) => {
    const id = req.params.id;
    try {
      const autor = await autores.findByIdAndUpdate(id, { $set: req.body });
      if (!autor) {
        res.status(404).send({ message: "Autor não encontrado" });
      } else {
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - Falha ao atualizar autor` });
    }
  };

  static excluirAutor = async (req, res) => {
    const id = req.params.id;
    try {
      const autor = await autores.findByIdAndDelete(id);
      if (!autor) {
        res.status(404).send({ message: "Autor não encontrado" });
      } else {
        res.status(200).send({ message: "Autor excluído com sucesso" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - Falha ao atualizar autor` });
    }
  };
}

export default AutorController;
