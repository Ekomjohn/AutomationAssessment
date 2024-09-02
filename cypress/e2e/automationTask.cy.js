/// <reference types="cypress" />

describe("Sauce Demo Login Tests", function () {

  // Use a beforeEach hook to visit the URL before each test
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  it("logs in with valid credentials and verifies successful login", () => {
    // Input valid username and password
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();

    // Verify that the URL includes "inventory" after login
    cy.url().should("include", "/inventory.html");

    // Additional assertion to confirm successful login
    cy.get('.title').should('have.text', 'Products');

    // Optional: Remove wait or use it more efficiently if needed
    // cy.wait(10000); // Not recommended for CI
  });

  it("fails to log in with invalid credentials", () => {
    // Input invalid username and password
    cy.get("#user-name").type("invalid_user");
    cy.get("#password").type("secret_source");
    cy.get("#login-button").click();

    // Verify that an error message is visible
    cy.get('[data-test="error"]').should("be.visible");

    // Additional assertion to check the error message text
    cy.get('[data-test="error"]').should("contain.text", "Username and password do not match");
  });
});
