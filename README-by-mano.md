\*_ Filmtips _\* Angular & Express applikation - med strikt Typescript

\* FRONTEND \*
Ett Angular-projekt byggt med TypeScript som implementerar funktioner för att hantera en lista över filmer. Projektet innehåller funktionalitet för att visa filmer, redigera detaljer, ta bort och lägga till filmer, och navigera mellan olika vyer med hjälp av Angular Routing.
top-list vy för att få med props där 2 komponenter pratar med varan, gallery komponenter hämtar detalj beskrivning från details komponenten när man trycker på bilden get och set där komponenter kommuniceear med varandra i via attribut.

hade inte tid till att publicera databasen online, men det stod inte som krav i labbem och jag kan göra demo, eller ladda upp den i efterhand.

i terminalen
cd frontend
npm i
npm run start

För att göra code coverage fick jag använda karma istället för Cypress.. varken cucumber eller cypress code coverage fungerar med Angular 19
Testrunner: Karma.
• Testbibliotek: Jasmine.
• Assertion: Jasmine’s inbyggda API (expect().toBe()).

Jasmine
Exempel:
Eftersom toBe() är en metod som tillhandahålls av Jasmine och inte TypeScript, kommer dess typer redan definieras i Jasmine’s egna typer (@types/jasmine).
Då har jag även lagt till
"types": ["jasmine"], i tsconfig.json
Därför fick deras typer förbli any

\* BACKEND \*
CRUD-funktioner:
Hämta alla filmer: GET /api/movies
Lägg till en ny film: POST /api/movies
Redigera en film: PUT /api/movies/:id
Ta bort en film: DELETE /api/movies/:id
PostgreSQL databas

cd backend
Lagt till tabell reviews
npm i

(jag kan köra demo på skolan annars, men om ni vill köra själva:)

ställ in databasen som heter filmtips

kopiera sql filen i roten av backend mappen

env filen i backend mappen:
PGURI=postgresql://filmtips_user:FHmX7CXT1nU5V7o8DKfhPkkhEe7Etxtm@dpg-ctgt7nbv2p9s73btpnog-a.frankfurt-postgres.render.com:5432/filmtips

npm run dev

har lagt till script i package.json
"scripts": {
"start": "node dist/app.js",
"dev": "ts-node-dev --respawn --transpile-only src/app.ts",.....}

\* För att starta testerta med cypress \*
stå i frontend mappen
kör npx cypress open
