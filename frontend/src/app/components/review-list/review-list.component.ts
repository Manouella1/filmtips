import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { IReview } from '../../models/review.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  // styleUrls: ['./review-list.component.css'],
  imports: [FormsModule, CommonModule],
})
export class ReviewListComponent implements OnInit {
  reviews: IReview[] = [];
  newReview: IReview = {
    id: 0,
    movie_id: 0,
    reviewer_name: '',
    review_text: '',
    rating: 0,
  };

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.fetchReviews(1); // Byt ut `1` med det aktuella film-ID:t vid behov
  }

  /**
   * Hämtar recensioner för en specifik film.
   * @param movieId Filmens ID vars recensioner ska hämtas.
   */
  fetchReviews(movieId: number): void {
    this.reviewService.getReviewsByMovieId(movieId).subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (err) => console.error('Error fetching reviews:', err),
    });
  }

  /**
   * Skapar en ny recension.
   */
  createReview(): void {
    if (
      this.newReview.reviewer_name.trim() &&
      this.newReview.review_text.trim() &&
      this.newReview.rating >= 1 &&
      this.newReview.rating <= 5
    ) {
      this.reviewService.addReview(this.newReview).subscribe({
        next: (createdReview) => {
          console.log('Review created:', createdReview);
          this.newReview = {
            id: 0,
            movie_id: this.newReview.movie_id,
            reviewer_name: '',
            review_text: '',
            rating: 0,
          };
          this.fetchReviews(this.newReview.movie_id); // Uppdatera listan
        },
        error: (err) => console.error('Error creating review:', err),
      });
    } else {
      console.error('Invalid review data');
    }
  }
}
