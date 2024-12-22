export interface ICreateReviewDTO {
  movie_id: number;
  reviewer_name: string;
  review_text: string;
  rating: number;
}

export interface IReviewRecord extends ICreateReviewDTO {
  id: number;
  created_at: string;
}

export const mapReviewRecord = (record: IReviewRecord): ICreateReviewDTO => ({
  movie_id: record.movie_id,
  reviewer_name: record.reviewer_name,
  review_text: record.review_text,
  rating: record.rating,
});

export const isValidReview = (review: any): review is ICreateReviewDTO =>
  review &&
  typeof review.movie_id === 'number' &&
  typeof review.reviewer_name === 'string' &&
  typeof review.review_text === 'string' &&
  typeof review.rating === 'number' &&
  review.rating >= 1 &&
  review.rating <= 5;
