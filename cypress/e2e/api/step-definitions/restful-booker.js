import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let token = "";
let bookingid = 0;

Given("User registered on the API", () => {  
})

When("I access the API request endpoint to create token", (datatable) => {
    const url = `${Cypress.env('URL')}/auth`;
    cy.log(datatable);
    cy.log(datatable.hashes())
    datatable.hashes().forEach(row => {
        cy.log("Request body: " + JSON.stringify(row))
        cy.request({
            method: "POST",
            url: url,
            headers: {
                "Content-Type": "application/json",
            },
            body:{
                "username": row.username,
                "password": row.password
            },
        }).as("endpoint")   
    })
})

Then("Verify the response status code {string}", (statusCode) => {
    cy.get("@endpoint").then((response) => {
        expect(response.status).to.equal(Number(statusCode));
        cy.log(response.body);
    });
});

Then("Verify the token contains {string} characters", (tokenLength) => {
    cy.get("@endpoint").then((response) => {
        token =response.body.token;
        expect(token.length).to.equal(Number(tokenLength))
    })
})

Then("Verify the token contains only alphanumeric characters", () => {
    cy.get("@endpoint").then((response) => {
        expect(token.includes('^[a-zA-Z0-9]*$')).to.equal(false);
    })
})

Given("The access API request endpoint", () => {
})

When("I access the API request endpoint to get all the booking ids", () => {
    const url = `${Cypress.env("URL")}/booking`;
    cy.request({
        method: "GET",
        url: url,
        headers: {
            "Content-type": "application/json",
        },
    }).as("endpoint");
})

When("I acces the API request endpoint to get all the booking ids filtered by name", (datatable) => {
    const url = `${Cypress.env("URL")}/booking`;
    datatable.hashes().forEach((row) => {
        cy.request({
            method: "GET",
            url: url,
            headers: {
                "Content-type": "application/json",
            },
            qs: {
                "firstname": row.firstname,
                "lastname": row.lastname
            }
        }).as("endpoint")
    })
})

When("I access the API request endpoint to get all the booking ids filtered by bookingdates", (datatable) => {
    const url = `${Cypress.env("URL")}/booking`;
    datatable.hashes().forEach((row) => {
        cy.log("bookingdates: " + JSON.stringify(row))
        cy.request({
            method: "GET",
            url: url,
            headers: {
                "Content-type": "application/json",
            },
            qs: {
                "checkin": row.checkin,
                "checkout": row.checkout
            }
        }).as("endpoint")
    })
})

Given("Booking not registered on the API", () => {
})

When("I access the API request endpoint to create a new booking", (datatable) => {
    const url = `${Cypress.env("URL")}/booking`;
    datatable.hashes().forEach((row) => {
        cy.request({
            method: "POST",
            url: url,
            headers: {
                "Content-type": "application/json",
            },
            body: {
                "firstname": row.firstname,
                "lastname": row.lastname,
                "totalprice": Number(row.totalprice),
                "depositpaid": Boolean(row.depositpaid),
                "bookingdates": {
                    "checkin": row.checkin,
                    "checkout": row.checkout
                },
                "additionalneeds": row.additionalneeds
            }
        }).as("endpoint")
    })
})

Then("Verify the response body contains the bookingid", () => {
    cy.get("@endpoint").then((response) => {
        bookingid = response.body.bookingid;
        expect(bookingid).to.exist;
    })
})

Given("Booking registered on the API", () => {})

When("I access the API request endpoint to get a single booking", () => {
    const url = `${Cypress.env("URL")}/booking/${bookingid}`
    cy.request({
        method: "GET",
        url: url,
        headers: {
            "Content-type": "application/json"
        }
    }).as("endpoint")
})

Then("Verify if the booking found is the right one", (datatable) => {
    cy.get("@endpoint").then((response) => {
        datatable.hashes().forEach((row) => {
            expect(row.firstname).to.equal(response.body.firstname);
            expect(row.lastname).to.equal(response.body.lastname);
            expect(Number(row.totalprice)).to.equal(response.body.totalprice);
            expect(Boolean(row.depositpaid)).to.equal(response.body.depositpaid);
            expect(row.checkin).to.equal(response.body.bookingdates.checkin);
            expect(row.checkout).to.equal(response.body.bookingdates.checkout);
            expect(row.additionalneeds).to.equal(response.body.additionalneeds);
        })
    })
})

When("I access the API request endpoint to update a booking", (datatable) => {
    const url = `${Cypress.env("URL")}/booking/${bookingid}`;
    datatable.hashes().forEach((row) => {
        cy.request({
            method: "PUT",
            url: url,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`
            },
            body: {
                "firstname": row.firstname,
                "lastname": row.lastname,
                "totalprice": Number(row.totalprice),
                "depositpaid": Boolean(row.depositpaid),
                "bookingdates": {
                    "checkin": row.checkin,
                    "checkout": row.checkout
                },
                "additionalneeds": row.additionalneeds
            }
        }).as("endpoint")
    })
})

When("I access the API request endpoint to partial update a booking", (datatable) => {
    const url = `${Cypress.env("URL")}/booking/${bookingid}`;
    datatable.hashes().forEach((row) => {
        cy.request({
            method: "PATCH",
            url: url,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`
            },
            body:{
                "firstname": row.firstname,
                "lastname": row.lastname
            }
        }).as("endpoint")
    })
})

When("I acces the request endpoint to delete a booking", () => {
    const url = `${Cypress.env("URL")}/booking/${bookingid}`;
        cy.request({
            method: "DELETE",
            url: url,
            headers: {
                "Content-type": "application/json",
                "Cookie": `token=${token}`
            }
        }).as("endpoint")
})

Given("And endpoint to confirm whethere the API is up and running", () => {
})

When("I access the api request endpoint to confirm the API is running", () => {
    const url = `${Cypress.env("URL")}/ping`;
    cy.request({
        method: "GET",
        url: url
    }).as("endpoint")
})