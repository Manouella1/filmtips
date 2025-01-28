import { Router } from 'express';
import { getGenres, addGenre } from '../controllers/genre.controller';
import { getMovies, addMovie, updateMovie, deleteMovie } from '../controllers/film.controller';
import { getMoviesWithReviews, getReviewsByMovieId, addReview } from '../controllers/review.controller';

const router = Router();

// Genres
router.get('/genres', getGenres);
router.post('/genres', addGenre);

// Movies
router.get('/movies', getMovies);
router.post('/movies', addMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

// Reviews
router.get('/movies/:movieId/reviews', getReviewsByMovieId);
router.post('/reviews', addReview);

export default router;
