const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'pueiyd',
  e2e: {
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    video: false,
    specPattern: 'cypress/integration/**/*.js',
    supportFile: 'cypress/support/index.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  // Legacy settings that can be preserved
  experimentalStudio: true,
}) 