export interface IMovie {
  id: number;
  title: string;
  description: string;
  genre: string;
  rating: number;
}

export interface ICreateMovieDTO {
  title: string;
  description: string;
  genre: string;
  rating: number;
}

export interface IMovieRecord {
  id: number;
  title: string;
  description: string;
  genre: string;
  rating: number;
}

export function isValidMovie(movie: unknown): movie is ICreateMovieDTO {
  if (!movie || typeof movie !== 'object') {
    return false;
  }

  const movieObj = movie as Record<string, unknown>;

  if (typeof movieObj.title !== 'string' || movieObj.title.trim() === '') {
    return false;
  }

  if (typeof movieObj.description !== 'string' || movieObj.description.trim() === '') {
    return false;
  }

  if (typeof movieObj.genre !== 'string' || movieObj.genre.trim() === '') {
    return false;
  }

  if (typeof movieObj.rating !== 'number' || movieObj.rating < 0 || movieObj.rating > 10) {
    return false;
  }

  return true;
}

export function mapMovieRecord(record: IMovieRecord): IMovie {
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    genre: record.genre,
    rating: record.rating,
  };
}
