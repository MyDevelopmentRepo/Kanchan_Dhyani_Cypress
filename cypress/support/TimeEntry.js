/// <reference types="cypress" />
import homeLoc from "../locators/home";
import timeTrackLoc from "../locators/TimeTrack";
import approvalLoc from "../locators/Approval";
import "cypress-soft-assertions";

Cypress.Commands.add("CreateTimeEntry", function (project, subProject) {
  cy.get(timeTrackLoc.AddTasksFromTheList).should("be.visible").click();
  cy.get(timeTrackLoc.SelectCustomerOrProject)
    .should("be.visible")
    .type(project)
    .type("{Enter}");

  cy.get(timeTrackLoc.GetSubProjectEntries).contains(subProject).click();
  cy.get(timeTrackLoc.AddSelectedButton).should("be.visible").click();

  cy.get("table#tt-table tbody[id='actualTTRows']")
    .should("be.visible")
    .contains(subProject)
    .should("be.visible")
    .parents("tr.assignedTaskRow")
    .find(timeTrackLoc.TodayWorkdayEntry)
    .type("08:00");

  cy.get(timeTrackLoc.ChangeStatusLink)
    .click()
    .contains("Done")
    .should("be.visible")
    .click();

  cy.get(timeTrackLoc.ChangeReadyForApproval)
    .eq(1)
    .should("be.visible")
    .click();

  cy.get(timeTrackLoc.TTSubmitSubmitButton).should("be.visible").click();
});

Cypress.Commands.add(
  "ApproveTimeEntry",
  function (firstName, lastName, manager, mgrPassword) {
    cy.url().should("include", "/login.do");
    cy.login(manager, mgrPassword);
    cy.url().should("include", "submit_tt.do");
    cy.get(homeLoc.ApproveTimeTrack).should("be.visible").click();

    cy.get(approvalLoc.StatusApprovalSelectorButton)
      .should("be.visible")
      .click();

    cy.get(approvalLoc.readyForApprovalBttn).check();
    cy.get(approvalLoc.notReadyForApprovalBttn).uncheck();
    cy.get(approvalLoc.rejectedBttn).uncheck();
    cy.contains("button", "Apply").should("be.visible").click();

    cy.get(approvalLoc.UserNameSearch)
      .should("be.visible")
      .type(lastName + "," + firstName)
      .wait(2000)
      .type("{enter}");

    cy.contains(firstName)
      .parents(approvalLoc.UserTTData)
      .find("tr.childRow.ready")
      .eq(0)
      .find("td.selectionCell input")
      .should("be.visible")
      .click();

    cy.get(approvalLoc.ApproveButton).should("be.visible").click();
  }
);
