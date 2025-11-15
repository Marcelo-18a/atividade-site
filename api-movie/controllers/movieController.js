import movieService from "../services/movieService.js";
import { ObjectId } from "mongodb";

// Função para LISTAR filmes
export const getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAll();
    // Retornar o array diretamente para o frontend consumir como esperado
    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para CADASTRAR filmes
export const createMovie = async (req, res) => {
  try {
    const { title, year, genre, director, cover } = req.body;
    await movieService.Create(title, year, genre, director, cover);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para DELETAR filmes
export const deleteMovie = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await movieService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é inválida" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para ALTERAR filmes
export const updateMovie = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const { title, year, genre, director, cover } = req.body;
      await movieService.Update(id, title, year, genre, director, cover);
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
