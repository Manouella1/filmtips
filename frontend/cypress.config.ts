import { defineConfig } from 'cypress';
//import preprocessor from '@badeball/cypress-cucumber-preprocessor';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // Lägg till Cucumber-preprocessor-plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Använd Esbuild-plugin
      on('file:preprocessor', createBundler());

      return config;
    },
    specPattern: '**/*.{feature,cy.ts}',
    baseUrl: 'http://localhost:4200',
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
