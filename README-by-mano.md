\*_ Filmtips _\* Angular & Express applikation - med strikt Typescript

\* FRONTEND \*
Ett Angular-projekt byggt med TypeScript som implementerar funktioner för att hantera en lista över filmer. Projektet innehåller funktionalitet för att visa filmer, redigera detaljer, ta bort och lägga till filmer, och navigera mellan olika vyer med hjälp av Angular Routing.
top-list vy för att få med props där 2 komponenter pratar med varan, gallery komponenter hämtar detalj beskrivning från details komponenten när man trycker på bilden get och set där komponenter kommuniceear med varandra i via attribut.

hade inte tid till att publicera databasen online, men det stod inte som krav i labbem och jag kan göra demo, eller ladda upp den i efterhand.

i terminalen
cd frontend
npm i
npm run start

\* BACKEND \*
CRUD-funktioner:
Hämta alla filmer: GET /api/movies
Lägg till en ny film: POST /api/movies
Redigera en film: PUT /api/movies/:id
Ta bort en film: DELETE /api/movies/:id
PostgreSQL databas

cd backend
npm i

(jag kan köra demo på skolan annars, men om ni vill köra själva:)

ställ in databasen som heter filmtips

kopiera sql filen i roten av backend mappen

env filen i backend mappen:
PORT=3000
POSTGRES_USER= <ditt_användarnamn>
POSTGRES_PASSWORD= <ditt_lösenord>
POSTGRES_HOST=localhost
POSTGRES_DB=filmtips
POSTGRES_PORT=5432

npm run dev

har lagt till script i package.json
"scripts": {
"start": "node dist/app.js",
"dev": "ts-node-dev --respawn --transpile-only src/app.ts",.....}

\* För att starta testerta med cypress \*
stå i frontend mappen
kör npx cypress open
