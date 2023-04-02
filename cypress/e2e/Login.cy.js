/// <reference types="cypress" /> 
import homeLoc from "../locators/home"
import loginLoc from "../locators/login"
import usersList from "../locators/UsersList"

describe('Login test Suite', () => {
  before(function(){
    cy.visit("/login.do")
    cy.fixture("Users").as("testUser")
  

 
  })

  it('Verify login with manager credentials and create new user', function () {  
      cy.login(this.testUser.manager.username, this.testUser.manager.password )
      cy.get(homeLoc.LoggedInUser).should("be.visible")
      cy.get(homeLoc.Users).should("be.visible").click().url().should('include', 'userlist.do')
     cy.get(usersList.NewUserButton).should("be.visible").click()
     cy.contains("Add User")
     cy.addUser(this.testUser.NewUser.FirstName, this.testUser.NewUser.LastName, this.testUser.NewUser.Email, this.testUser.NewUser.Department,this.testUser.NewUser.Date)

  })


  

})