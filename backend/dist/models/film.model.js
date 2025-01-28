"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidMovie = isValidMovie;
exports.mapMovieRecord = mapMovieRecord;
function isValidMovie(movie) {
    if (!movie || typeof movie !== 'object') {
        return false;
    }
    const movieObj = movie;
    if (typeof movieObj.title !== 'string' || movieObj.title.trim() === '') {
        return false;
    }
    if (typeof movieObj.description !== 'string' || movieObj.description.trim() === '') {
        return false;
    }
    if (typeof movieObj.genre !== 'string' || movieObj.genre.trim() === '') {
        return false;
    }
    if (typeof movieObj.rating !== 'number' || movieObj.rating < 0 || movieObj.rating > 10) {
        return false;
    }
    return true;
}
function mapMovieRecord(record) {
    return {
        id: record.id,
        title: record.title,
        description: record.description,
        genre: record.genre,
        rating: record.rating,
    };
}
