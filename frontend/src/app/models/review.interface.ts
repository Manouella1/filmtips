export interface IReview {
  id?: number; // Gör id valfritt
  movie_id: number;
  reviewer_name: string;
  review_text: string;
  rating: number;
}
export interface IMovie {
  id: number;
  title: string;
  description?: string; // Gör valfri om de inte alltid finns
  genre?: string;       // Gör valfri om de inte alltid finns
  rating?: number;      // Gör valfri om de inte alltid finns
}
