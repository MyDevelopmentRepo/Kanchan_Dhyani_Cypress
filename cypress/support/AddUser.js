/// <reference types="cypress" />
import AddUser from "../locators/addUser";
import Activation from "../locators/Activation";

Cypress.Commands.add(
  "addUser",
  function (
    firstname,
    lastname,
    emailAddress,
    copySettingFromUser,
    hireDate,
    serverId,
    password
  ) {
    cy.get(AddUser.CopySettingDropdown).click();
    cy.get("a.triState span[title='" + copySettingFromUser + "']").click();
    cy.get(AddUser.CopySettingDropdown).click();
    cy.get(AddUser.FirstNameField).should("be.visible").type(firstname);
    cy.get(AddUser.LastNameField).should("be.visible").type(lastname);
    cy.get(AddUser.EmailField).should("be.visible").type(emailAddress);
    cy.get(AddUser.AccessToActiPlansDiv)
      .click()
      .should("have.attr", "class", "components_switcher small animated off");

    setDatePicker(hireDate);

    sendInvitationAndActivateUser(serverId, emailAddress, password);
  }
);

function sendInvitationAndActivateUser(serverId, emailAddress, password) {
  cy.get(AddUser.SaveAndSendInvitation)
    .should("be.visible")
    .click()
    .then(() => {
      cy.wait(15000);
      cy.mailosaurGetMessage(serverId, {
        sentTo: emailAddress,
      }).then((email) => {
        cy.log(email.subject);
        let activationLink = email.html.links[0].href;
        cy.log(activationLink);
        cy.wrap(activationLink).should("not.be.null").visit(activationLink);
        cy.get(Activation.Password).should("be.visible").type(password);
        cy.get(Activation.ConfirmPassword).should("be.visible").type(password);
        cy.get(Activation.submit).should("be.visible").click();
        cy.get(Activation.productTour).should("be.visible").click();
      });
    });
}

function setDatePicker(hiredate) {
  var dateStr = hiredate.split("-");
  cy.get(AddUser.HireDate).eq(0).click();
  cy.log(dateStr);
  cy.get("div.x-date-picker button[class='x-btn-text']")
    .should("be.visible")
    .click();

  getText(dateStr);

  cy.get(".x-date-inner tbody td[class*='x-date-active']")
    .contains(dateStr[1])
    .eq(0)
    .should("be.visible")
    .click();
}

function getText(dateStr) {
  cy.get("div.x-date-mp").then((topObj) => {
    if (topObj.text().includes(dateStr[2])) {
      cy.get("div.x-date-mp").should("be.visible").contains(dateStr[2]).click();
      cy.get("div.x-date-mp").should("exist").contains(dateStr[0]).click();
      cy.get("tr.x-date-mp-btns").should("be.visible").contains("OK").click();
      return;
    } else {
      cy.get("a.x-date-mp-prev").scrollIntoView().should("exist").click();
    }
    getText(dateStr);
  });
}
