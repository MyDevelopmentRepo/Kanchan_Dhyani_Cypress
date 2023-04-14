/// <reference types="cypress" />
import homeLoc from "../locators/home";
import usersList from "../locators/UsersList";
import TimeTrack from "../locators/TimeTrack";

describe("Login test Suite", () => {
  before(function () {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
    cy.visit("/login.do");
    cy.fixture("Users").as("testUser");
    cy.fixture("server").as("mailServer");
    cy.fixture("testData").as("testData");
  });

  it("e2e flow from use creation, TT creation, approval and verification ", function () {
    let mngrUserName = this.testUser.manager.username;
    let mngrPassword = this.testUser.manager.password;
    let userFirstName = this.testUser.NewUser.FirstName + Date.now().toString();
    let userPassword = this.testUser.NewUser.password;

    let email =
      this.testUser.NewUser.FirstName +
      Date.now().toString() +
      "@" +
      this.mailServer.serverDomain;

    let serverId = this.mailServer.serverId;
    let lastName = this.testUser.NewUser.LastName;

    // login with manager credentials
    cy.url().should("include", "/login.do");
    cy.login(mngrUserName, mngrPassword);

    //Assertions
    cy.get(homeLoc.LoggedInUser).should("be.visible");
    cy.get(homeLoc.Users)
      .should("be.visible")
      .click()
      .url()
      .should("include", "userlist.do");
    cy.get(usersList.NewUserButton).should("be.visible").click();
    //cy.contains("Add User");

    // Add user
    cy.addUser(
      userFirstName,
      lastName,
      email,
      this.testData.copySettingFromUser,
      this.testUser.NewUser.HireDate,
      serverId,
      this.testUser.NewUser.password
    );

    //  Create Time Entry
    cy.url().should("include", "/submit_tt.do");
    cy.title().should("include", "Enter Time-Track");
    cy.CreateTimeEntry(this.testData.project, this.testData.subProject);

    // Logout
    cy.logout();

    // Approve Time entry
    cy.ApproveTimeEntry(userFirstName, lastName, mngrUserName, mngrPassword);
    cy.logout();

    // validate Time Sheet is approved
    cy.login(userFirstName, userPassword);
    cy.get(TimeTrack.TTStatusText).eq(1).should("have.text", "Approved");
  });
});
