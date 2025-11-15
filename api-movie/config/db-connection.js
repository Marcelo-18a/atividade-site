import mongoose from "mongoose";

const dbUser = "marceloyogo37_db_user";
const dbPassword = "2raadelBKnSbNj23";
const connect = () => {
  mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.nc5tpjj.mongodb.net/api-movies?retryWrites=true&w=majority&appName=Cluster0`
  );

  const connection = mongoose.connection;
  connection.on("error", () => {
    console.log("Erro ao conectar com mongoDB.");
  });
  connection.on("open", () => {
    console.log("conectado ao mongoDB com sucesso!");
  });
};
connect();
export default mongoose;
