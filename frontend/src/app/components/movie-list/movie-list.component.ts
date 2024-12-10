import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovie } from '../../models/movie.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  imports: [FormsModule, CommonModule],
})
export class MovieListComponent implements OnInit {
  movies: IMovie[] = [];
  movieToEdit: IMovie = {
    id: 0,
    title: '',
    description: '',
    genre: '',
    rating: 0,
  };


  isEditing: boolean = false;
  newMovie: IMovie = {
    id: 0,
    title: '',
    description: '',
    genre: '',
    rating: 0,
  };

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }


  fetchMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (err) => console.error('Error fetching movies:', err),
    });
  }

  /**
   * Tar bort en film me id.
   * @param id Filmens ID som ska raderas.
   */
  deleteMovie(id: number): void {
    this.movieService.deleteMovie(id).subscribe({
      next: () => {
        console.log(`Movie with ID ${id} deleted.`);
        this.fetchMovies(); // Uppdatera listan efter radering
      },
      error: (err) => console.error('Error deleting movie:', err),
    });
  }


  createMovie(): void {
    if (
      this.newMovie.title.trim() &&
      this.newMovie.description.trim() &&
      this.newMovie.genre.trim() &&
      this.newMovie.rating >= 0
    ) {
      this.movieService.addMovie(this.newMovie).subscribe({
        next: (createdMovie) => {
          console.log('Movie created:', createdMovie);
          this.newMovie = {
            id: 0,
            title: '',
            description: '',
            genre: '',
            rating: 0,
          };
          this.fetchMovies();
        },
        error: (err) => console.error('Error creating movie:', err),
      });
    } else {
      console.error('Invalid movie data');
    }
  }

  /**
   * @param movie Filmen som ska redigeras.
   */
  editMovie(movie: IMovie): void {
    this.movieToEdit = { ...movie }; // Skapa en kopia för att undvika direktändringar
    this.isEditing = true; // visa modal
  }

  /**
   * Uppdaterar valda me PUT.
   */
  updateMovie(): void {
    if (
      this.movieToEdit.title.trim() &&
      this.movieToEdit.description.trim() &&
      this.movieToEdit.genre.trim() &&
      this.movieToEdit.rating >= 0
    ) {
      this.movieService.updateMovie(this.movieToEdit.id, this.movieToEdit).subscribe({
        next: (updatedMovie) => {
          console.log('Movie updated:', updatedMovie);
          this.closeEditModal();
          this.fetchMovies();
        },
        error: (err) => console.error('Error updating movie:', err),
      });
    } else {
      console.error('Invalid movie data');
    }
  }


  closeEditModal(): void {
    this.isEditing = false;
    this.movieToEdit = {
      id: 0,
      title: '',
      description: '',
      genre: '',
      rating: 0,
    }; // tbx t tomt objekt
  }
}
