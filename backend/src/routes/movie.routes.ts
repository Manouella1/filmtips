import { Router } from 'express';
import { getMovies, addMovie, updateMovie, deleteMovie } from '../controllers/film.controller';

const router = Router();

router.get('/', getMovies);
router.post('/', addMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
