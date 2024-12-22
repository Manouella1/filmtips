export interface IReview {
  id: number;
  movie_id: number;
  reviewer_name: string;
  review_text: string;
  rating: number; // 1-5
}
