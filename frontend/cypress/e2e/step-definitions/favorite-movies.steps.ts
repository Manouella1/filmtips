import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

import { FavoriteMoviesComponent } from '../../../src/app/components/movie-favorites/movie-favorites.component';
import { mount } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

Given('the favorite movie list is empty', () => {
  mount(FavoriteMoviesComponent, {
    imports: [FormsModule, CommonModule],
  });
  cy.get('.favorite-list').should('not.exist');
});

When('I add {string} to the favorite list', (movieTitle: string) => {
  cy.get('input[name="movie-title"]').type(movieTitle);
  cy.get('button').contains('Add to Favorites').click();
});

Then('I should see {string} in the favorite list', (movieTitle: string) => {
  cy.get('.favorite-list').should('exist');
  cy.get('.favorite-list-item').should('contain.text', movieTitle);
});

Given('the favorite movie list contains {string}', (movieTitle: string) => {
  mount(FavoriteMoviesComponent, {
    imports: [FormsModule, CommonModule],
  });
  cy.get('input[name="movie-title"]').type(movieTitle);
  cy.get('button').contains('Add to Favorites').click();
  cy.get('.favorite-list-item').should('contain.text', movieTitle);
});

When('I remove {string} from the favorite list', (movieTitle: string) => {
  cy.get('.favorite-list-item')
    .contains(movieTitle)
    .find('.remove-button')
    .click();
});

Then('I should not see any movies in the favorite list', () => {
  cy.get('.favorite-list').should('not.exist');
});
