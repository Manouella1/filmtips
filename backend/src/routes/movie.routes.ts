import { Router } from 'express';
import { getMovies, addMovie, updateMovie, deleteMovie } from '../controllers/film.controller';
import { getReviewsByMovieId, addReview } from '../controllers/review.controller';

const router = Router();

router.get('/movies/:movieId/reviews', getReviewsByMovieId);
router.post('/movies/:movieId/reviews', addReview);
router.get('/', getMovies);
router.post('/', addMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
