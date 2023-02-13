const { Given } = require("@badeball/cypress-cucumber-preprocessor");
import { config } from "../config";

Given("A query to select all categories", () => {
    cy.task("DATABASE", {
        dbConfig: config,
        sql: 'select * from "categorias"'
    }).then(result => {
        cy.log(result.rows);
        result.rows.forEach(row => {
            cy.log(JSON.stringify(row))
        });
        cy.log(result.rows[0].id_categoria)
        cy.log(result.rows[0].descripcion)
    })
})