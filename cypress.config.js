const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'fj4fos',
  e2e: {
    baseUrl: 'http://qamid.tmweb.ru',
    retries: {
      runMode: 1,
      openMode: 1,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
