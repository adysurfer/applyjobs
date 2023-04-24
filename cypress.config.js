const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'https://www.userlane.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      require('@cypress/grep/src/plugin')(config)
        return config
      },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    chromeWebSecurity: false,
  },
  env: {
    // Grep options for triggering tests
    grepFilterSpecs: true,
    iphone: 'iphone-8'
  },
  retries: {
    runMode: 2,
    openMode: 2
  }
})

