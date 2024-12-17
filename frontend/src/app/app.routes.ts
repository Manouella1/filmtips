import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';

import { MovieGalleryComponent } from './components/movie-gallery/movie-gallery.component';
import { FavoriteMoviesComponent } from './components/movie-favorites/movie-favorites.component';

export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'list', component: MovieGalleryComponent },
  { path: 'favorites', component: FavoriteMoviesComponent },


];
