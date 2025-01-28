"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.addMovie = exports.getMovies = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const film_model_1 = require("../models/film.model");
const getMovies = async (req, res) => {
    try {
        const result = await db_config_1.default.query(`
            SELECT movies.id, movies.title, movies.description, genres.name AS genre, movies.rating
            FROM movies
            LEFT JOIN genres ON movies.genre_id = genres.id
            ORDER BY movies.id DESC
            `);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};
exports.getMovies = getMovies;
const addMovie = async (req, res) => {
    const { title, description, genre_id, rating } = req.body;
    if (!title || !rating || typeof rating !== 'number') {
        res.status(400).json({ error: 'Invalid movie data' });
        return;
    }
    try {
        const result = await db_config_1.default.query('INSERT INTO movies (title, description, genre_id, rating) VALUES ($1, $2, $3, $4) RETURNING *', [title, description, genre_id, rating]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ error: 'Failed to add movie' });
    }
};
exports.addMovie = addMovie;
const updateMovie = async (req, res) => {
    const id = parseInt(req.params.id);
    // Validera inkommande data
    if (!(0, film_model_1.isValidMovie)(req.body)) {
        res.status(400).json({ error: 'Invalid movie data' });
        return;
    }
    const movie = req.body;
    try {
        const result = await db_config_1.default.query('UPDATE movies SET title = $1, description = $2, genre = $3, rating = $4 WHERE id = $5 RETURNING *', [movie.title, movie.description, movie.genre, movie.rating, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }
        res.json((0, film_model_1.mapMovieRecord)(result.rows[0]));
    }
    catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'Failed to update movie' });
    }
};
exports.updateMovie = updateMovie;
const deleteMovie = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await db_config_1.default.query('DELETE FROM movies WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }
        res.status(204).send(); // 204 = No Content
    }
    catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ error: 'Failed to delete movie' });
    }
};
exports.deleteMovie = deleteMovie;
