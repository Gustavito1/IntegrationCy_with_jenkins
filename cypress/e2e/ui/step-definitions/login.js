const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
import LoginPage from "../Pages/loginPage";

Given("the login page is operative", () => {
    cy.visit(Cypress.env('baseUrl/web/index.php/auth/login'));
})

When("the user fill the login form", (datatable) => {
    datatable.hashes().forEach((row) => {
        LoginPage.fillInputs(row.username, row.password)
    })
})

Then("the user can see his profile name {string}", (name) => {
    LoginPage.validateProfileName(name)
})

Then("click the login button", () => {
    LoginPage.submitLogin();
})

Then("the web page show the error message {string}", (message) => {
    LoginPage.validateMessage(message);
})