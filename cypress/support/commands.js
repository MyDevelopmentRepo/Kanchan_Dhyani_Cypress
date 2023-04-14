/// <reference types="cypress" />
import userLoc from "../locators/login";
import homeLoc from "../locators/home";
import "cypress-mailosaur";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (user, password) => {
  cy.get(userLoc.UserName).type(user);
  cy.get(userLoc.Password).type(password);
  cy.get(userLoc.LoginBttn).click();
});

Cypress.Commands.add("logout", () => {
  cy.get(homeLoc.LogoutLink).should("be.visible").click();
});

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
