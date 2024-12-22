import { Request, Response } from 'express';
import pool from '../config/db.config';
import { ICreateReviewDTO, IReviewRecord, isValidReview, mapReviewRecord } from '../models/review.interface';

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
    if (!isValidReview(req.body)) {
        res.status(400).json({ error: 'Invalid review data' });
        return;
    }

    const review: ICreateReviewDTO = req.body;

    try {
        const result = await pool.query<IReviewRecord>(
            'INSERT INTO reviews (movie_id, reviewer_name, review_text, rating) VALUES ($1, $2, $3, $4) RETURNING *',
            [review.movie_id, review.reviewer_name, review.review_text, review.rating]
        );

        res.status(201).json(mapReviewRecord(result.rows[0]));
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
};
