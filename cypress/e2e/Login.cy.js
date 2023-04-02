/// <reference types="cypress" /> 
import homeLoc from "../locators/home"
import loginLoc from "../locators/login"
import usersList from "../locators/UsersList"
let user
let email
let serverId
describe('Login test Suite', () => {
  before(function(){
    cy.visit("/login.do")
    cy.fixture("Users").as("testUser")
    cy.fixture("server").as("mailServer")
  

 
  })

  it('Verify login with manager credentials and create new user', function () {  
      cy.login(this.testUser.manager.username, this.testUser.manager.password )
      cy.get(homeLoc.LoggedInUser).should("be.visible")
      cy.get(homeLoc.Users).should("be.visible").click().url().should('include', 'userlist.do')
     cy.get(usersList.NewUserButton).should("be.visible").click()
     cy.contains("Add User")
     user = this.testUser.NewUser.FirstName + Date.now().toString()
     email = this.testUser.NewUser.FirstName + Date.now().toString()+"@"+this.mailServer.serverDomain
     serverId = this.testUser.NewUser.serverId
     cy.addUser(user, this.testUser.NewUser.LastName, email, 
      this.testUser.NewUser.Department,this.testUser.NewUser.Date, serverId, this.testUser.NewUser.password)

  })


  

})