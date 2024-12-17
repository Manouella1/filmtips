describe('FavoriteMoviesComponent', () => {
  beforeEach(() => {
    cy.mount('<app-favorite-movies></app-favorite-movies>');
  });

  it('should start with an empty favorite list', () => {
    cy.get('.favorite-list').should('not.exist');
  });
});

it('should add a movie to the favorite list', () => {
  cy.mount('<app-favorite-movies></app-favorite-movies>');

  cy.get('input[name="movie-title"]').type('Inception');
  cy.get('button').contains('Add to Favorites').click();

  cy.get('.favorite-list').should('exist');
  cy.get('.favorite-list-item').should('contain.text', 'Inception');
});

it('should remove a movie from the favorite list', () => {
  cy.mount('<app-favorite-movies></app-favorite-movies>');

  cy.get('input[name="movie-title"]').type('Inception');
  cy.get('button').contains('Add to Favorites').click();

  cy.get('.favorite-list-item').contains('Inception').find('.remove-button').click();
  cy.get('.favorite-list').should('not.exist');
});
