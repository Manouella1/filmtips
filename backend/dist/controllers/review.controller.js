"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = exports.getReviewsByMovieId = exports.getMoviesWithReviews = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const review_interface_1 = require("../models/review.interface");
const getMoviesWithReviews = async (req, res) => {
    try {
        const result = await db_config_1.default.query(`
          SELECT DISTINCT movies.id, movies.title
          FROM movies
          INNER JOIN reviews ON movies.id = reviews.movie_id
          ORDER BY movies.title
          `);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching movies with reviews:', error);
        res.status(500).json({ error: 'Failed to fetch movies with reviews' });
    }
};
exports.getMoviesWithReviews = getMoviesWithReviews;
const getReviewsByMovieId = async (req, res) => {
    const movieId = parseInt(req.params.movieId);
    try {
        const result = await db_config_1.default.query('SELECT * FROM reviews WHERE movie_id = $1 ORDER BY created_at DESC', [movieId]);
        const reviews = result.rows.map(review_interface_1.mapReviewRecord);
        res.json(reviews);
    }
    catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};
exports.getReviewsByMovieId = getReviewsByMovieId;
const addReview = async (req, res) => {
    const { movie_id, reviewer_name, review_text, rating } = req.body;
    if (!movie_id || !reviewer_name || !review_text || typeof rating !== 'number') {
        res.status(400).json({ error: 'Invalid review data' });
        return;
    }
    try {
        // Kontrollera att filmen finns
        const movieCheck = await db_config_1.default.query('SELECT id FROM movies WHERE id = $1', [movie_id]);
        if (movieCheck.rowCount === 0) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }
        const result = await db_config_1.default.query('INSERT INTO reviews (movie_id, reviewer_name, review_text, rating) VALUES ($1, $2, $3, $4) RETURNING *', [movie_id, reviewer_name, review_text, rating]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
};
exports.addReview = addReview;
