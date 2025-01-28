"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidReview = exports.mapReviewRecord = void 0;
const mapReviewRecord = (record) => ({
    movie_id: record.movie_id,
    reviewer_name: record.reviewer_name,
    review_text: record.review_text,
    rating: record.rating,
});
exports.mapReviewRecord = mapReviewRecord;
const isValidReview = (review) => review &&
    typeof review.movie_id === 'number' &&
    typeof review.reviewer_name === 'string' &&
    typeof review.review_text === 'string' &&
    typeof review.rating === 'number' &&
    review.rating >= 1 &&
    review.rating <= 5;
exports.isValidReview = isValidReview;
