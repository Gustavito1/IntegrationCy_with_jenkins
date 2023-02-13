const { Given } = require("@badeball/cypress-cucumber-preprocessor");

Given("select products", () => {
    cy.task("DATABASE", {
        dbConfig: Cypress.config('DB'),
        sql: 'select * from productos',
    }).then(result => {
        result.forEach(row => {
            cy.log(JSON.stringify(row))
        })
    })
})