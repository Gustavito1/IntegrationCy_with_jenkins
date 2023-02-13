Feature: Restful Booker API

    Feature Description

    @Authorization
    Scenario: Auth - Create Token
        Given User registered on the API
        When I access the API request endpoint to create token
            | username | password    |
            | admin    | password123 |
        Then Verify the response status code "200"

    @Authorization
    Scenario: The token contains 15 characters
        Given User registered on the API
        When I access the API request endpoint to create token
            | username | password    |
            | admin    | password123 |
        Then Verify the response status code "200"
        And Verify the token contains "15" characters

    @Authorization
    Scenario: The token contains only alphanumeric characters
        Given User registered on the API
        When I access the API request endpoint to create token
            | username | password    |
            | admin    | password123 |
        Then Verify the response status code "200"
        And Verify the token contains only alphanumeric characters

    @GetBooking
    Scenario: Get booking ids
        Given The access API request endpoint
        When I access the API request endpoint to get all the booking ids
        Then Verify the response status code "200"

    @GetBooking
    Scenario: Get booking ids filtered by name
        Given The access API request endpoint
        When I acces the API request endpoint to get all the booking ids filtered by name
            | firstname | lastname |
            | Sally     | Brown    |
        Then Verify the response status code "200"

    @GetBooking
    Scenario: Get booking ids filtered by checkin/checkout
        Given The access API request endpoint
        When I access the API request endpoint to get all the booking ids filtered by bookingdates
            | checkin    | checkout   |
            | 2022-03-13 | 2022-05-21 |
        Then Verify the response status code "200"

    @CreateBooking
    Scenario: Create a new booking on the API
        Given Booking not registered on the API
        When I access the API request endpoint to create a new booking
            | firstname | lastname | totalprice | depositpaid | checkin    | checkout   | additionalneeds |
            | Johan     | Vicencio | 111        | true        | 2022-12-01 | 2022-12-04 | Breakfast       |
        Then Verify the response status code "200"
        And Verify the response body contains the bookingid

    @GetBookingById
    Scenario: Get a single booking registered on the API
        Given Booking registered on the API
        When I access the API request endpoint to get a single booking
        Then Verify the response status code "200"
        And Verify if the booking found is the right one
            | firstname | lastname | totalprice | depositpaid | checkin    | checkout   | additionalneeds |
            | Johan     | Vicencio | 111        | true        | 2022-12-01 | 2022-12-04 | Breakfast       |

    @UpdateBooking
    Scenario: Update booking
        Given Booking registered on the API
        When I access the API request endpoint to update a booking
            | firstname | lastname | totalprice | depositpaid | checkin    | checkout   | additionalneeds |
            | Johan     | Vicencio | 100        | true        | 2022-12-01 | 2022-12-03 | Breakfast       |
        Then Verify the response status code "200"

    @PatchBooking
    Scenario: Patch booking
        Given Booking registered on the API
        When I access the API request endpoint to partial update a booking
            | firstname | lastname |
            | bryan     | corrales |
        Then Verify the response status code "200"   

    @DeleteBooking
    Scenario: Delete Booking
        Given Booking registered on the API
        When I acces the request endpoint to delete a booking
        Then Verify the response status code "201"

    @Ping
    Scenario: Ping - HealthCheck
        Given And endpoint to confirm whethere the API is up and running
        When I access the api request endpoint to confirm the API is running
        Then Verify the response status code "201"    