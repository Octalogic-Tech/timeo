import { wait } from "@testing-library/react";

describe("Test 1", () => {
  it("Visit the website", () => {
    cy.visit("http://localhost:3000/");
    cy.wait(500);
  });

  it("Add new card", () => {
    // Look for search bar
    cy.get(".MuiInputBase-root").click();
    // Click on timezone
    cy.wait(500);
    cy.contains("Africa").then((result) => {
      if (result) {
        result.click();
        cy.get("[aria-label=Clear]").click();
      }
    });
  });
  it("Remove  card", () => {
    // Remove the card
    cy.wait(500);
    cy.get("svg[id=1]").click();
  });

  it("Update the Time", () => {
    cy.wait(500);
    cy.get(".MuiBox-root-29").click();

    cy.contains("City Name").then(() => {
      cy.get(".select_city").click();

      cy.contains("Chicago").then((city) => {
        city.click();
        cy.wait(200);
        cy.contains("UPDATE").click();
      });
    });
  });

  it("Pick time", () => {
    cy.get(".MuiBox-root-31>h4").click();
    wait(200);
    cy.contains("OK").click();
  });

  it("Reset time", () => {
    cy.contains("RESET").click();
  });
});
