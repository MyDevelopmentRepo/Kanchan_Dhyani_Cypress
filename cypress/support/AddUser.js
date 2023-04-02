/// <reference types="cypress" />
import AddUser from "../locators/addUser"
import Activation from "../locators/Activation"



Cypress.Commands.add("addUser", function (firstname, lastname, emailAddress, department,hireDate,serverId, password){
   //cy.fixture("Users").as("testUser")
   cy.get(AddUser.CopySettingDropdown).click()
   cy.get("a.triState span[title='White, Jane']").click()
   cy.get(AddUser.CopySettingDropdown).click()
   cy.get(AddUser.FirstNameField).should("be.visible").type(firstname)
   cy.get(AddUser.LastNameField).should("be.visible").type(lastname)
   cy.get(AddUser.EmailField).should("be.visible").type(emailAddress)


   cy.get(AddUser.AccessToActiPlansDiv).click().should("have.attr", 'class', 'components_switcher small animated off')
  
 
cy.get(AddUser.SaveAndSendInvitation).should("be.visible").click().then(()=>{
   
          
           cy.wait(10000)
           cy.mailosaurGetMessage("nvvcvogk",{
              sentTo : emailAddress
           }).then(email => {
               cy.wait(15000)
               cy.log(email.subject)
               let activationLink = email.html.links[0].href
               cy.log(activationLink)
               cy.wrap(activationLink).should("not.be.null").visit(activationLink)
               cy.get(Activation.Password).should("be.visible").type(password)
               cy.get(Activation.ConfirmPassword).should("be.visible").type(password)
               cy.get(Activation.submit).should("be.visible").click()
               cy.get(Activation.productTour).should("be.visible").click()


          })

   
})

   
})

function setDatePicker()
{
   let dateStr = this.testUser.NewUser.HireDate
   let dateChars = dateStr.split('-')
   cy.get(AddUser.HireDate).click()
   cy.get("div.x-date-picker button[class='x-btn-text']").should('be.visible').click()
  // while( !cy.get("div.x-date-mp").should('be.visible').contains(dateChars[2]))
 //  {
     
  // }
}