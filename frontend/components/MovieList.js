import MovieCard from "./MovieCard";
import styles from "../styles/MovieList.module.css";

export default function MovieList({ movies, onDelete, onEdit }) {
  if (!movies || movies.length === 0)
    return <p className={styles.empty}>Nenhum filme encontrado.</p>;

  return (
    <section className={styles.grid}>
      {movies.map((m) => (
        <MovieCard
          key={m._id || m.id}
          movie={m}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
}
