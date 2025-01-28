import { Request, Response } from 'express';
import pool from '../config/db.config';

export const getGenres = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM genres ORDER BY name');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({ error: 'Failed to fetch genres' });
    }
};

export const addGenre = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
        res.status(400).json({ error: 'Invalid genre name' });
        return;
    }

    try {
        const result = await pool.query(
            'INSERT INTO genres (name) VALUES ($1) RETURNING *',
            [name]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding genre:', error);
        res.status(500).json({ error: 'Failed to add genre' });
    }
};
