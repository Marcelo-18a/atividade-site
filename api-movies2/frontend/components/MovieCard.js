import styles from "../styles/MovieCard.module.css";

export default function MovieCard({ movie, onDelete, onEdit }) {
  const title = movie.title || movie.nome || "Sem título";
  const year = movie.year || movie.releaseYear || movie.ano || "";
  const description =
    movie.description || movie.sinopse || movie.overview || "";
  const genre = movie.genre || movie.genero || "";
  const director = movie.director || movie.diretor || "";
  // Prefer `cover` from the API (model), fall back to other common fields
  const cover =
    movie.cover || movie.poster || movie.coverUrl || movie.image || "";

  const placeholder = `https://via.placeholder.com/300x450.png?text=${encodeURIComponent(
    title || "Sem Capa"
  )}`;

  return (
    <article className={styles.card}>
      <div className={styles.coverWrap}>
        <img
          className={styles.cover}
          src={cover || placeholder}
          alt={`${title} - capa`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholder;
          }}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.meta}>
          <h3 className={styles.title}>{title}</h3>
          {year && <span className={styles.year}>{year}</span>}
        </div>

        {genre && (
          <p className={styles.sub}>
            <strong>Gênero:</strong> {genre}
          </p>
        )}
        {director && (
          <p className={styles.sub}>
            <strong>Diretor:</strong> {director}
          </p>
        )}

        {description ? (
          <p className={styles.desc}>{description}</p>
        ) : (
          <p className={styles.desc}>Descrição não disponível.</p>
        )}

        <div className={styles.actions}>
          <button
            className={styles.btn}
            onClick={() => (onEdit ? onEdit(movie) : null)}
            aria-label="Editar filme"
          >
            Editar
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              const id = movie._id || movie.id;
              if (onDelete && id) onDelete(id);
            }}
            aria-label="Deletar filme"
          >
            Deletar
          </button>
        </div>
      </div>
    </article>
  );
}
