// cypress.config.ts

import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task";

// We create minimal type aliases from the codeCoverageTask parameters
// so we avoid "any" but don't rely on Cypress types that don't exist.
type CypressOn = Parameters<typeof codeCoverageTask>[0];
type CypressConfig = Parameters<typeof codeCoverageTask>[1];

export default defineConfig({
  e2e: {
    // Called when Cypress starts up, so we can register code coverage plugin
    setupNodeEvents(on: CypressOn, config: CypressConfig) {
      codeCoverageTask(on, config);
      // Return the updated config object
      return config;
    },

    // Replace with your local dev server
    baseUrl: "http://localhost:4200",

    // Where to find your .feature files (Cucumber, if you’re using that)
    specPattern: "**/*.feature",
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    // Where to find your component test specs
    specPattern: "**/*.cy.ts",
  },
});
