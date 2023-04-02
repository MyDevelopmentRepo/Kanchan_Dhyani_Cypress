/// <reference types="cypress" />
import AddUser from "../locators/addUser"

Cypress.Commands.add("addUser", function (firstname, lastname, email, department,hireDate){
   cy.fixture("Users").as("testUser")
   cy.get(AddUser.CopySettingDropdown).click()
   cy.get("a.triState span[title='White, Jane']", {timeout : 10000}).click()
   cy.get(AddUser.CopySettingDropdown).click()
   cy.get(AddUser.FirstNameField).should("be.visible").type(this.testUser.NewUser.FirstName)
   cy.get(AddUser.LastNameField).should("be.visible").type(this.testUser.NewUser.LastName)
   cy.get(AddUser.EmailField).should("be.visible").type(this.testUser.NewUser.Email)


   cy.get(AddUser.AccessToActiPlansDiv).click().should("have.attr", 'class', 'components_switcher small animated off')
   
 //  cy.get(AddUser.HireDate).type(this.testUser.NewUser.HireDate)

// cy.get(AddUser.HireDate).then(date=>{
 //  date.innerText = this.testUser.NewUser.HireDate
// })
   
})

function setDatePicker()
{
   let dateStr = this.testUser.NewUser.HireDate
   let dateChars = dateStr.split('-')
   cy.get(AddUser.HireDate).click()
   cy.get("div.x-date-picker button[class='x-btn-text']").should('be.visible').click()
   while( !cy.get("div.x-date-mp").should('be.visible').contains(dateChars[2]))
   {
     
   }
}