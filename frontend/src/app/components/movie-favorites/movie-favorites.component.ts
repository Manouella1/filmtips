import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-favorites',
  standalone: true,
  templateUrl: './movie-favorites.component.html',
  styleUrls: ['./movie-favorites.component.css'],
  imports: [FormsModule, CommonModule], // Importera CommonModule och FormsModule
})
export class FavoriteMoviesComponent {
  favoriteMovies: string[] = [];
  newMovieTitle: string = '';

  addToFavorites(): void {
    if (this.newMovieTitle) {
      this.favoriteMovies.push(this.newMovieTitle);
      this.newMovieTitle = '';
    }
  }

  removeFromFavorites(movie: string): void {
    this.favoriteMovies = this.favoriteMovies.filter((m) => m !== movie);
  }
}
