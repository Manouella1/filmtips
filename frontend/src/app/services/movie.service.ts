import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/api/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.apiUrl);
  }

  addMovie(movie: IMovie): Observable<IMovie> {
    return this.http.post<IMovie>(this.apiUrl, movie);
  }

  updateMovie(id: number, movie: IMovie): Observable<IMovie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<IMovie>(url, movie);
  }

  deleteMovie(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
