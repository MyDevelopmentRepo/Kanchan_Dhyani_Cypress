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
    MAILOSAUR_API_KEY: "csY96KMspLx4N7SKh67Kcv73cLfrmOEs",
  },
});
