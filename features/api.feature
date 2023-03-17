Feature: Part2 - Retrieving data from REST API
  As a user of the API
  I want to be able to retrieve data from the API


   Scenario: Retrieving email addresses of another(not of logged in user) practice
    Given User is logged in
    When I send a GET request to get email addresses of practice id 2
    Then Response should show appropriate error message

   Scenario: Text search "veterinary" after logging in
    Given User is logged in
    When I text search with - veterinary
    Then Response should have list of data with display name containing - veterinary

   Scenario: Text search "veterinary" without logging in
    When I text search with - veterinary without logging in
    Then Response should show message that user is not authorized