/// <reference types="cypress" />
import homeLoc from "../locators/home"
import loginLoc from "../locators/login"

describe("Add user suite", ()=>{

    beforeEach(()=>{
        cy.visit("")
  cy.fixture("testData").as("testUser")
    })

  it("Add user", function() {
    cy.login(this.testUser.validUser.username, this.testUser.validUser.password)
  cy.get("a.oxd-main-menu-item.active").find("span.oxd-text.oxd-text--span.oxd-main-menu-item--name").should("have.text","Dashboard").click()

  })





})