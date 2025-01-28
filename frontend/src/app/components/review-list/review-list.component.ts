import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/review.service';
import { IReview } from '../../models/review.interface';
import { IMovie } from '../../models/movie.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-reviews',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ReviewListComponent implements OnInit {
  movies: IMovie[] = [];
  selectedMovieId: number | null = null;
  newReview: IReview = {
    movie_id: 0,
    reviewer_name: '',
    review_text: '',
    rating: 0,
  };

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  /**
   * Hämta filmer med recensioner
   */
  fetchMovies(): void {
    this.movieService.getMoviesWithReviews().subscribe({
      next: (data: IMovie[]) => {
        this.movies = data;
      },
      error: (err: unknown) => {
        console.error('Error fetching movies with reviews:', err);
      },
    });
  }

  /**
   * Lägg till recension
   */
  addReview(): void {
    if (this.selectedMovieId) {
      this.newReview.movie_id = this.selectedMovieId;

      this.movieService.addReview(this.newReview).subscribe({
        next: () => {
          console.log('Review added successfully');
          this.fetchMovies(); // Uppdatera lista
          this.resetReviewForm();
        },
        error: (err: unknown) => {
          console.error('Error adding review:', err);
        },
      });
    } else {
      console.error('No movie selected');
    }
  }

  /**
   * Återställ formuläret
   */
  resetReviewForm(): void {
    this.newReview = {
      movie_id: 0,
      reviewer_name: '',
      review_text: '',
      rating: 0,
    };
    this.selectedMovieId = null;
  }

  /**
   * Hämta titel för vald film
   */
  getSelectedMovieTitle(): string | undefined {
    const selectedMovie = this.movies.find((m) => m.id === this.selectedMovieId);
    return selectedMovie?.title;
  }
}
