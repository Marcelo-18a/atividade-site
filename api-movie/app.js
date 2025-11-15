import express from "express";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import mongoose from "./config/db-connection.js";

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/api-movies")
//   .then(() => console.log("MongoDB conectado!"))
//   .catch(err => console.error("Erro ao conectar no MongoDB:", err));

// Rotas
app.use("/", movieRoutes);

// Iniciar servidor
const port = 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`API rodando em http://localhost:${port}.`);
});
