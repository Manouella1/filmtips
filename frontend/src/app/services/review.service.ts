import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
}

export interface Review {
  movie_id: number;
  reviewer_name: string;
  review_text: string;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiBaseUrl = 'http://localhost:3000/api/movies'

  constructor(private http: HttpClient) {}

  getMoviesWithReviews(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiBaseUrl}/movies/reviews`);
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiBaseUrl}/reviews`, review);
  }
}
