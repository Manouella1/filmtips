"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGenre = exports.getGenres = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const getGenres = async (req, res) => {
    try {
        const result = await db_config_1.default.query('SELECT * FROM genres ORDER BY name');
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({ error: 'Failed to fetch genres' });
    }
};
exports.getGenres = getGenres;
const addGenre = async (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        res.status(400).json({ error: 'Invalid genre name' });
        return;
    }
    try {
        const result = await db_config_1.default.query('INSERT INTO genres (name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error adding genre:', error);
        res.status(500).json({ error: 'Failed to add genre' });
    }
};
exports.addGenre = addGenre;
