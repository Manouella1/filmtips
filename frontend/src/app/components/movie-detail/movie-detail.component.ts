import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  imports: [CommonModule]
})
export class MovieDetailComponent {
  private _movie: { title: string; description: string; poster: string } | null = null;

  @Input()
  set movie(value: { title: string; description: string; poster: string } | null) {
    this._movie = value;
  }

  get movie(): { title: string; description: string; poster: string } | null {
    return this._movie;
  }

  get hasMovie(): boolean {
    return this._movie !== null;
  }
}
