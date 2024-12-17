describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.get ('.movie-list-title')
    .first()
    .should('contain.text', 'Avatar');

  })
})
describe('Integration Tests for Backend', () => {
  it('should fetch movies via GET request', () => {
    cy.request('GET', '/api/movies').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it('should create a new movie via POST request', () => {
    const newMovie = {
      title: 'Avatar',
      description: 'A sci-fi epic on Pandora.',
      genre: 'Sci-Fi',
      rating: 8,
    };

    cy.request('POST', '/api/movies', newMovie).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.eq('Avatar');
    });
  });
});

// Mocka GET anrop
describe('Movie List Tests', () => {
  beforeEach(() => {
    // Mocka GET-anropet och använd data från en fixture
    cy.intercept('GET', 'http://localhost:3000/api/movies', { fixture: 'movies.json' }).as('getMovies');
    cy.visit('/'); // Besök sidan som laddar MovieListComponent
  });

  it('should fetch and display movies from the backend', () => {
    // Vänta på att GET-anropet ska returnera
    cy.wait('@getMovies');

    // Kontrollera att filmerna renderas korrekt i DOM
    cy.get('.movie-list-item').should('have.length', 2); // Kontrollera att två filmer renderas
    cy.get('.movie-list-item').first().should('contain.text', 'Inception'); // Första filmen
    cy.get('.movie-list-item').last().should('contain.text', 'Avatar'); // Sista filmen
  });
});

// Testar att en film kan sskapas och visas
it('should create a new movie and display it in the list', () => {
  cy.intercept('POST', '/api/movies', {
    id: 3,
    title: 'The Matrix',
    description: 'A cyberpunk classic.',
    genre: 'Sci-Fi',
    rating: 10,
  }).as('createMovie');

  cy.intercept('GET', '/api/movies', [
    {
      id: 1,
      title: 'Inception',
      description: 'A mind-bending thriller about dreams within dreams.',
      genre: 'Sci-Fi',
      rating: 9,
    },
    {
      id: 2,
      title: 'Avatar',
      description: 'A sci-fi epic on Pandora.',
      genre: 'Sci-Fi',
      rating: 8,
    },
    {
      id: 3,
      title: 'The Matrix',
      description: 'A cyberpunk classic.',
      genre: 'Sci-Fi',
      rating: 10,
    },
  ]).as('getMoviesAfterCreation');

  cy.visit('/');
  cy.wait('@getMoviesAfterCreation');

  // Fyll i formuläret för att skapa en ny film
  cy.get('input#title').type('The Matrix');
  cy.get('input#description').type('A cyberpunk classic.');
  cy.get('input#genre').type('Sci-Fi');
  cy.get('input#rating').type('10');
  cy.get('button[type="submit"]').contains('Add Movie').click();

  // Vänta på att POST-anropet ska göras
  cy.wait('@createMovie');

  // Kontrollera att den nya filmen visas i listan
  cy.wait('@getMoviesAfterCreation');
  cy.get('.movie-list-item').should('have.length', 3);
  cy.get('.movie-list-item').last().should('contain.text', 'The Matrix');
});


// Movie Gallery component

describe('MovieGalleryComponent Tests', () => {
  beforeEach(() => {
    cy.visit('/list'); // Ruta för MovieGalleryComponent
  });

  it('should display all movies in the gallery', () => {
    cy.get('.movie-card').should('have.length', 4); // Kontrollera att 4 filmer renderas
    cy.get('.movie-title').first().should('contain.text', 'Inception'); // Första filmen
    cy.get('.movie-title').last().should('contain.text', 'Braveheart'); // Sista filmen
  });

  it('should display movie details when a movie is clicked', () => {
    // Klicka på en film
    cy.get('.movie-card').first().click();

    // Kontrollera att detaljer visas i MovieDetailComponent
    cy.get('.movie-detail').should('be.visible');
    cy.get('.detail-title').should('contain.text', 'Inception');
    cy.get('.detail-description').should('contain.text', 'A mind-bending thriller about dreams within dreams.');
  });
});
