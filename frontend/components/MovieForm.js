import React from "react";
import styles from "../styles/MovieForm.module.css";

export default function MovieForm({
  initial = {},
  onCancel,
  onSubmit,
  mode = "create",
}) {
  const [title, setTitle] = React.useState(initial.title || "");
  const [year, setYear] = React.useState(initial.year || "");
  const [genre, setGenre] = React.useState(initial.genre || "");
  const [director, setDirector] = React.useState(initial.director || "");
  const [cover, setCover] = React.useState(initial.cover || "");

  function submit(e) {
    e.preventDefault();
    const payload = {
      title: title.trim(),
      year: year ? Number(year) : undefined,
      genre: genre.trim() || undefined,
      director: director.trim() || undefined,
      cover: cover.trim() || undefined,
    };
    onSubmit(payload);
  }

  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={submit}>
        <h2>{mode === "create" ? "Adicionar filme" : "Editar filme"}</h2>
        <label>
          Título
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Ano
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="number"
          />
        </label>
        <label>
          Gênero
          <input value={genre} onChange={(e) => setGenre(e.target.value)} />
        </label>
        <label>
          Diretor
          <input
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </label>
        <label>
          URL da capa
          <input value={cover} onChange={(e) => setCover(e.target.value)} />
        </label>

        <div className={styles.actions}>
          <button type="button" className={styles.btnCancel} onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className={styles.btnSubmit}>
            {mode === "create" ? "Adicionar" : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
