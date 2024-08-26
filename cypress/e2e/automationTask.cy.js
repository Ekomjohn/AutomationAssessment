/// <reference types="cypress" />

describe("Automating the testing of a web application's login functionality using Cypress", function () {
  it("navigates to the Sauce Labs URL and logs in with valid credentials", () => {
    // Input valid username and password
    cy.visit("https://www.saucedemo.com/");

    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();

    cy.url()
      .should("include", "inventory")
      .then((urlIncludesInventory) => {
        if (urlIncludesInventory) {
          cy.log("User successfully logged in");
        } else {
          cy.log("Login failed");
        }
      });
    cy.wait(10000)
  });

  it("should fail to log in with invalid credentials", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("#user-name").type("invalid_user");
    cy.get("#password").type("secret_source");
    cy.get("#login-button").click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .then((errorVisible) => {
        if (errorVisible) {
          cy.log("Failed to login with invalid credentials.");
        }
      });
  });
});
