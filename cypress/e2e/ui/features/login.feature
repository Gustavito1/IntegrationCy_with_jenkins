@Login
Feature: Login functionality

    @HappyPath
    Scenario: As user i want to login
        Given the login page is operative
        When the user fill the login form
            | username | password |
            | Admin    | admin123 |
        And click the login button
        Then the user can see his profile name "Paul Collings"

    @UnhappyPath
    Scenario: Wrong username or password
        Given the login page is operative
        When the user fill the login form
            | username | password   |
            | Admin    | Admin12345 |
        And click the login button
        Then the web page show the error message "Invalid credentials"
