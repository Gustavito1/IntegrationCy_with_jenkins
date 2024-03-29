const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

const mysql = require("mysql");  

module.exports = defineConfig({
  //Viewport
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    //Features path
    specPattern: "cypress/e2e/**/features/*.feature",
    //UI
    
    //API
    env: {
      baseUrl: "https://opensource-demo.orangehrmlive.com",
      URL: "https://restful-booker.herokuapp.com",
      
    },
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      //DATABASE
      on("task", {
        DATABASE({dbConfig, sql}){
          const client = mysql.createConnection(dbConfig);
          return new Promise((resolve, reject) => {
            client.query(sql, (error, results) => {
              if(error) reject(error);
              resolve(results);
            })
          })
        }
      })

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    DB: {
      host: "localhost",
      user: "root",
      password: "root",
      database: "ecommerce"
    }
  },
});
