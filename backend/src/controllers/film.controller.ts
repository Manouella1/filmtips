import { Request, Response } from 'express';
import pool from '../config/db.config';
import {
    ICreateMovieDTO,
    IMovieRecord,
    isValidMovie,
    mapMovieRecord
} from '../models/film.model';


export const getMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query<IMovieRecord>('SELECT * FROM movies ORDER BY id DESC');
        const movies = result.rows.map(mapMovieRecord);
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};


export const addMovie = async (req: Request, res: Response): Promise<void> => {
    // Validera inkommande data
    if (!isValidMovie(req.body)) {
        res.status(400).json({ error: 'Invalid movie data' });
        return;
    }

    const movie: ICreateMovieDTO = req.body;

    try {
        const result = await pool.query<IMovieRecord>(
            'INSERT INTO movies (title, description, genre, rating) VALUES ($1, $2, $3, $4) RETURNING *',
            [movie.title, movie.description, movie.genre, movie.rating] // Alla fält är nu REQUIRED
        );

        res.status(201).json(mapMovieRecord(result.rows[0]));
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ error: 'Failed to add movie' });
    }
};


export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    // Validera inkommande data
    if (!isValidMovie(req.body)) {
        res.status(400).json({ error: 'Invalid movie data' });
        return;
    }

    const movie: ICreateMovieDTO = req.body;

    try {
        const result = await pool.query<IMovieRecord>(
            'UPDATE movies SET title = $1, description = $2, genre = $3, rating = $4 WHERE id = $5 RETURNING *',
            [movie.title, movie.description, movie.genre, movie.rating, id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }

        res.json(mapMovieRecord(result.rows[0]));
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'Failed to update movie' });
    }
};


export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
        const result = await pool.query(
            'DELETE FROM movies WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }

        res.status(204).send(); // 204 = No Content
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ error: 'Failed to delete movie' });
    }
};
