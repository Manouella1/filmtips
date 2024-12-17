import { defineConfig } from 'cypress'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CYPRESS_baseUrl: string;
    }
  }
}

export default defineConfig({

  e2e: {
    baseUrl: process.env['CYPRESS_baseUrl']  || 'http://localhost:4201',
  },


  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }

})
