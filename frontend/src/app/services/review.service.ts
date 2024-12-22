import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReview } from '../models/review.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/reviews'; // Justera till din backend-URL

  constructor(private http: HttpClient) {}

  getReviewsByMovieId(movieId: number): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.apiUrl}?movie_id=${movieId}`);
  }

  addReview(review: IReview): Observable<IReview> {
    return this.http.post<IReview>(this.apiUrl, review);
  }
}
