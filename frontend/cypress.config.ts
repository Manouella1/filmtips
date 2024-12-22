import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task";


type CypressOn = Parameters<typeof codeCoverageTask>[0];
type CypressConfig = Parameters<typeof codeCoverageTask>[1];

export default defineConfig({
  e2e: {

    setupNodeEvents(on: CypressOn, config: CypressConfig) {
      codeCoverageTask(on, config);

      return config;
    },

    baseUrl: "http://localhost:4200",


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
