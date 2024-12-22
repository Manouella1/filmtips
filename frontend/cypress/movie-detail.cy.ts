import '@cypress/code-coverage/support';
import { MovieDetailComponent } from '../src/app/components/movie-detail/movie-detail.component';

describe('MovieDetailComponent Tests', () => {
  it('should display movie details when a valid movie is passed', () => {
    const movie = {
      title: 'The Dark Knight',
      description: 'Batman faces his greatest foe, the Joker.',
      poster: 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg',
    };

    cy.mount(MovieDetailComponent, {
      componentProperties: { movie },
    });

    cy.get('.detail-title').should('contain.text', 'The Dark Knight');
    cy.get('.detail-description').should('contain.text', 'Batman faces his greatest foe, the Joker.');
    cy.get('.movie-poster').should('have.attr', 'src', movie.poster);
  });

  it('should not display anything when no movie is passed', () => {
    cy.mount(MovieDetailComponent, {
      componentProperties: { movie: null },
    });

    cy.get('.movie-detail').should('not.exist');
  });
});
