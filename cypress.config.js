const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://demo.actitime.com",
    defaultCommandTimeout: 7000,
  },

  env: {
    MAILOSAUR_API_KEY: "tjBcAc18VSGgwLgAiHeU7Bw8iTZ8Lejl",
  },
});
