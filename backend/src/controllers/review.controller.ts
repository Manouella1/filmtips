import { Request, Response } from 'express';
import pool from '../config/db.config';
import { ICreateReviewDTO, IReviewRecord, isValidReview, mapReviewRecord } from '../models/review.interface';

export const getMoviesWithReviews = async (req: Request, res: Response): Promise<void> => {
  try {
      const result = await pool.query(
          `
          SELECT DISTINCT movies.id, movies.title
          FROM movies
          INNER JOIN reviews ON movies.id = reviews.movie_id
          ORDER BY movies.title
          `
      );

      res.json(result.rows);
  } catch (error) {
      console.error('Error fetching movies with reviews:', error);
      res.status(500).json({ error: 'Failed to fetch movies with reviews' });
  }
};

export const getReviewsByMovieId = async (req: Request, res: Response): Promise<void> => {
    const movieId = parseInt(req.params.movieId);

    try {
        const result = await pool.query<IReviewRecord>(
            'SELECT * FROM reviews WHERE movie_id = $1 ORDER BY created_at DESC',
            [movieId]
        );

        const reviews = result.rows.map(mapReviewRecord);
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

export const addReview = async (req: Request, res: Response): Promise<void> => {
    const { movie_id, reviewer_name, review_text, rating } = req.body;

    if (!movie_id || !reviewer_name || !review_text || typeof rating !== 'number') {
        res.status(400).json({ error: 'Invalid review data' });
        return;
    }

    try {
        // Kontrollera att filmen finns
        const movieCheck = await pool.query('SELECT id FROM movies WHERE id = $1', [movie_id]);
        if (movieCheck.rowCount === 0) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }

        const result = await pool.query(
            'INSERT INTO reviews (movie_id, reviewer_name, review_text, rating) VALUES ($1, $2, $3, $4) RETURNING *',
            [movie_id, reviewer_name, review_text, rating]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
};
