import Movie from "../models/Movie.js";

class movieService {
  async getAll() {
    try {
      const movies = await Movie.find();
      return movies;
    } catch (error) {
      console.log(error);
    }
  }

  async Create(title, year, genre, director, cover) {
    try {
      const coverUrl =
        cover && String(cover).trim() !== ""
          ? cover
          : `https://via.placeholder.com/300x450.png?text=${encodeURIComponent(
              title || "Capa"
            )}`;

      const newMovie = new Movie({
        title,
        year,
        genre,
        director,
        cover: coverUrl,
      });
      await newMovie.save();
      console.log(`Filme "${title}" cadastrado com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }

  async Delete(id) {
    try {
      await Movie.findByIdAndDelete(id);
      console.log(`Filme com a id: ${id} foi deletado com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }

  async Update(id, title, year, genre, director, cover) {
    try {
      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (year !== undefined) updateData.year = year;
      if (genre !== undefined) updateData.genre = genre;
      if (director !== undefined) updateData.director = director;

      if (cover !== undefined) {
        updateData.cover =
          String(cover).trim() !== ""
            ? cover
            : `https://via.placeholder.com/300x450.png?text=${encodeURIComponent(
                title || "Capa"
              )}`;
      } else if (title !== undefined) {
        // If title changed and no cover provided, regenerate cover based on new title
        updateData.cover = `https://via.placeholder.com/300x450.png?text=${encodeURIComponent(
          title
        )}`;
      }

      await Movie.findByIdAndUpdate(id, updateData);
      console.log(`Dados do filme com id ${id} alterados com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new movieService();
