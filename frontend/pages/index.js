import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MovieList from "../components/MovieList";
import MovieForm from "../components/MovieForm";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  async function loadMovies() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/movies`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, [API_URL]);

  // modal states & CRUD submit functions
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [formInitial, setFormInitial] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openCreate = () => {
    setFormMode("create");
    setFormInitial({});
    setShowForm(true);
  };

  const openEdit = (movie) => {
    setFormMode("edit");
    setFormInitial(movie);
    setShowForm(true);
  };

  const openDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const submitCreate = async (payload) => {
    try {
      const res = await fetch(`${API_URL}/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Falha ao criar o filme");
      setShowForm(false);
      await loadMovies();
    } catch (err) {
      alert(err.message);
    }
  };

  const submitUpdate = async (payload) => {
    try {
      const id = formInitial._id || formInitial.id;
      const res = await fetch(`${API_URL}/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Falha ao atualizar");
      setShowForm(false);
      await loadMovies();
    } catch (err) {
      alert(err.message);
    }
  };

  const submitDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/movies/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Falha ao deletar");
      setShowConfirm(false);
      setDeleteId(null);
      await loadMovies();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout>
      <main>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>Filmes</h1>
          <button
            onClick={openCreate}
            style={{ padding: "8px 12px", cursor: "pointer" }}
          >
            Adicionar filme
          </button>
        </div>
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <MovieList movies={movies} onDelete={openDelete} onEdit={openEdit} />
        )}

        {showForm && (
          <MovieForm
            initial={formInitial}
            mode={formMode}
            onCancel={() => setShowForm(false)}
            onSubmit={(data) =>
              formMode === "create" ? submitCreate(data) : submitUpdate(data)
            }
          />
        )}

        {showConfirm && (
          <ConfirmDialog
            message={"Deseja realmente deletar este filme?"}
            onCancel={() => setShowConfirm(false)}
            onConfirm={submitDelete}
          />
        )}
      </main>
    </Layout>
  );
}
