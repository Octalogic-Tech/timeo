describe("Test 1", () => {
  it("Visit the website", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("contains", "/");
    cy.wait(500);
  });
  it("Add new card", () => {
    // Look for search bar
    cy.get(".MuiAutocomplete-clearIndicator").should("not.be.visible");
    cy.get(".MuiInputBase-root")
      .find("input")
      .should(($element) => {
        expect($element).to.have.value("");
      })
      .click();

    // Click on timezone
    cy.wait(500);
    cy.contains("America/Chicago").then((result) => {
      if (result) {
        cy.get(".MuiAutocomplete-clearIndicator").should("be.visible");
        result.click();
        cy.get(".MuiInputBase-root")
          .as("root")
          .find("input")
          .should("have.value", "America/Chicago");

        cy.get("@root").trigger("mouseover");

        cy.get(".MuiAutocomplete-clearIndicator").should("be.visible");
        cy.get("[aria-label=Clear]").click();

        // Find newly added card
        cy.get(".MuiGrid-item ")
          .find("div")
          .should(($div) => {
            const div = $div[2];
            expect(div).to.have.id("timezone_card_1");
          });
      }
    });
  });
  it("Remove  card", () => {
    // Remove the card
    cy.wait(500);

    cy.get(".MuiBox-root>h5").should(($h5) => {
      expect($h5, "Must have a h5 tag").to.have.length(1);
      expect($h5, "Should show city/country").to.have.text("Chicago");
    });

    cy.get(".MuiCardContent-root")
      .find("svg")
      .should((svg) => {
        expect(svg).to.have.id(1);
      })
      .click();
  });

  it("Update the Time", () => {
    cy.wait(500);
    cy.get(".MuiBox-root-29").should("have.class", "MuiTypography-h4").click();

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
