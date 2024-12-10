CREATE TABLE
  movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    genre TEXT NOT NULL,
    rating INTEGER NOT NULL
  );

INSERT INTO
  movies (title, description, genre, rating)
VALUES
  (
    'Inception',
    'A mind-bending thriller about dreams within dreams.',
    'Sci-Fi',
    9
  ),
  (
    'The Dark Knight',
    'Batman faces his greatest foe, the Joker.',
    'Action',
    10
  ),
  (
    'The Godfather',
    'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.',
    'Crime',
    10
  ),
  (
    'Pulp Fiction',
    'The lives of two mob hitmen, a boxer, and others intertwine in four tales of violence and redemption.',
    'Crime',
    9
  ),
  (
    'Toy Story',
    'A cowboy doll is profoundly threatened by a new spaceman action figure.',
    'Animation',
    8
  );

SELECT
  *
FROM
  movies;
