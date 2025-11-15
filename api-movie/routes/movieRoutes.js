import express from "express";
import { getAllMovies, createMovie, deleteMovie, updateMovie } from "../controllers/movieController.js";

const router = express.Router();

router.get("/movies", getAllMovies);
router.post("/movies", createMovie);
router.delete("/movies/:id", deleteMovie);
router.put("/movies/:id", updateMovie);

export default router;
