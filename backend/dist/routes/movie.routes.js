"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genre_controller_1 = require("../controllers/genre.controller");
const film_controller_1 = require("../controllers/film.controller");
const review_controller_1 = require("../controllers/review.controller");
const router = (0, express_1.Router)();
// Genres
router.get('/genres', genre_controller_1.getGenres);
router.post('/genres', genre_controller_1.addGenre);
// Movies
router.get('/movies', film_controller_1.getMovies);
router.post('/movies', film_controller_1.addMovie);
router.put('/movies/:id', film_controller_1.updateMovie);
router.delete('/movies/:id', film_controller_1.deleteMovie);
// Reviews
router.get('/movies/:movieId/reviews', review_controller_1.getReviewsByMovieId);
router.post('/reviews', review_controller_1.addReview);
exports.default = router;
