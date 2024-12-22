import { FavoriteMoviesComponent } from '../src/app/components/movie-favorites/movie-favorites.component';
import { mount } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import '@angular/compiler';
// BDD beteende:
// 	•	Given: Listan med favoritfilmer är tom.
//	•	When: Användaren lägger till en film.
//	•	Then: Filmen visas i favoritlistan.

describe('FavoriteMoviesComponent', () => {
  beforeEach(() => {
    mount(FavoriteMoviesComponent, {
      imports: [FormsModule, CommonModule], // Lägg till nödvändiga Angular-moduler
    });
  });

  it('should start with an empty favorite list', () => {
    cy.get('.favorite-list').should('not.exist');
  });

  it('should add a movie to the favorite list', () => {
    cy.get('input[name="movie-title"]').type('Inception');
    cy.get('button').contains('Add to Favorites').click();

    cy.get('.favorite-list').should('exist');
    cy.get('.favorite-list-item').should('contain.text', 'Inception');
  });

  it('should remove a movie from the favorite list', () => {
    cy.get('input[name="movie-title"]').type('Inception');
    cy.get('button').contains('Add to Favorites').click();

    cy.get('.favorite-list-item')
      .contains('Inception')
      .find('.remove-button')
      .click();

    cy.get('.favorite-list').should('not.exist');
  });
});
