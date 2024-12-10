
// Movie-detail component
import {MovieDetailComponent} from '../src/app/components/movie-detail/movie-detail.component';

describe('MovieDetailComponent Tests', () => {
  it('should display movie details when a valid movie is passed', () => {
    // Mocka filmen som ska visas i komponenten
    const movie = {
      title: 'The Dark Knight',
      description: 'Batman faces his greatest foe, the Joker.',
      poster: 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg',
    };

    // Ladda MovieDetailComponent med mockad data
    cy.mount(MovieDetailComponent, {
componentProperties: {movie: movie}
    })

    // Kontrollera att detaljerna renderas
    cy.get('.detail-title').should('contain.text', 'The Dark Knight');
    cy.get('.detail-description').should('contain.text', 'Batman faces his greatest foe, the Joker.');
   // cy.get('.detail-poster').should('have.attr', 'src', movie.poster);
  });

  it('should not display anything when no movie is passed', () => {
    // Ladda MovieDetailComponent utan någon film
    cy.mount('<app-movie-detail></app-movie-detail>', {
      componentProperties: { movie: null },
    });

    // Kontrollerar att komponenten inte renderar något
    cy.get('.movie-detail').should('not.exist');
  });
});
