const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

const pg = require("pg")
module.exports = defineConfig({
  //Viewport
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    //Features path
    specPattern: "cypress/e2e/**/features/*.feature",
    //UI
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    //API
    env: {
      URL: "https://restful-booker.herokuapp.com"
    },
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      //DATABASE
      on("task", {
        DATABASE({ dbConfig, sql }) {
          const client = new pg.Pool(dbConfig);
          return client.query(sql);
        },
      });
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    }
  },
});
