Feature: Login Scenarios
    As a user of the-internet
    I want to be able to log in with valid credentials
    And see appropriate error messages for invalid credentials

    Background:
        Given I am on the login page

    Scenario Outline: Login with <scenario> credentials
        When I enter username "<username>" and password "<password>"
        And I click the login button
        Then I should see the "<expectedMessage>" message

        Examples:
            | scenario                  | username  | password             | expectedMessage                  |
            | valid                     | tomsmith  | SuperSecretPassword! | You logged into a secure area!   |
            | invalid username          | invalid   | SuperSecretPassword! | Your username is invalid!        |
            | invalid password          | tomsmith  | WrongPassword        | Your password is invalid!        |
            # | invalid username and pass | invalid   | WrongPassword        | Your username is invalid!        |
