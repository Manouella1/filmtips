import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-gallery',
  standalone: true,
  templateUrl: 'movie-gallery.component.html',
  styleUrls: ['movie-gallery.component.css'],
  imports: [CommonModule, MovieDetailComponent],
})
export class MovieGalleryComponent {
  private _selectedMovie: { title: string; description: string; poster: string } | null = null;

  // Lista med filmer (här kan du lägga till eller ändra filmer)
  movies = [
    {
      title: 'Inception',
      description: 'A mind-bending thriller about dreams within dreams.',
      poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    },
    {
      title: 'The Dark Knight',
      description: 'Batman faces his greatest foe, the Joker.',
      poster: 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg',
    },
    {
      title: 'Interstellar',
      description: 'Dr Mann (Matt Damon) says that the last thing humans will see before they die is their children (or loved ones).',
      poster: 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    },
    {
      title: 'Braveheart',
      description: 'rue leadership will call us to stand up and therefore stand out..',
      poster: 'https://upload.wikimedia.org/wikipedia/en/3/35/Braveheart_s6bvs6wz.png',
    }
  ];

  // hämta vald film
  get selectedMovie(): { title: string; description: string; poster: string } | null {
    return this._selectedMovie;
  }

  // sätta vald film
  set selectedMovie(movie: { title: string; description: string; poster: string } | null) {
    this._selectedMovie = movie;
  }

  // välja en film
  selectMovie(movie: { title: string; description: string; poster: string }): void {
    this.selectedMovie = movie;
  }

  // navigering (om routing används, oklart jus nu)
  navigateToDetails(movie: { title: string; description: string; poster: string }): void {
    // Skickar vald film som state via router
    const router = new Router();
    router.navigate(['/details'], { state: { movie } });
  }
}
