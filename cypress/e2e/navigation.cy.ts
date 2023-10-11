describe("main menu", () => {
  it("should correctly navigate to all pages from the main menu", () => {
    cy.visit("/");
    cy.get('[data-cy="ciphers-dropdown-menu"]').click();
    cy.get('[data-cy="caesar-btn"]').click();
    cy.location("hash").should("eq", "#/caesar-cipher");
    cy.get('[data-cy="ciphers-dropdown-menu"]').click();
    cy.get('[data-cy="vigenère-btn"]').click();
    cy.location("hash").should("eq", "#/vigenere-cipher");
    cy.get('[data-cy="ciphers-dropdown-menu"]').click();
    cy.get('[data-cy="emoji-btn"]').click();
    cy.location("hash").should("eq", "#/emoji-cipher");
    cy.get('[data-cy="about-btn"]').click();
    cy.location("hash").should("eq", "#/about");
    cy.get('[data-cy="home-btn"]').click();
    cy.location("hash").should("eq", "#/");
    cy.get('[data-cy="theme-switch-btn"]').click();
    cy.location("hash").should("eq", "#/");
    cy.get('[data-cy="theme-switch-btn"]').click();
    cy.location("hash").should("eq", "#/");
  });
});
