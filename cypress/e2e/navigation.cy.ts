describe("main menu", () => {
  it("should correctly navigate to all pages from the main menu", () => {
    cy.visit("/");
    cy.get("h4").contains("Emoji Cipher");

    cy.get('[data-cy="ciphers-dropdown-menu"]').click();
    cy.get('[data-cy="caesar-btn"]').click();
    cy.location("pathname").should("eq", "/caesar-cipher");
    cy.get("h4").contains("Caesar Cipher");

    cy.get('[data-cy="ciphers-dropdown-menu"]').click();
    cy.get('[data-cy="vigenère-btn"]').click();
    cy.location("pathname").should("eq", "/vigenere-cipher");
    cy.get("h4").contains("Vigenère Cipher");

    cy.get('[data-cy="ciphers-dropdown-menu"]').click();
    cy.get('[data-cy="emoji-btn"]').click();
    cy.location("pathname").should("eq", "/emoji-cipher");
    cy.get("h4").contains("Emoji Cipher");

    cy.get('[data-cy="about-btn"]').click();
    cy.location("pathname").should("eq", "/about");
    cy.get("h4").contains("About");

    cy.get('[data-cy="home-btn"]').click();
    cy.location("pathname").should("eq", "/");
    cy.get("h4").contains("Emoji Cipher");

    cy.get('[data-cy="theme-switch-btn"]').click();
    cy.location("pathname").should("eq", "/");
    cy.get("h4").contains("Emoji Cipher");
    cy.get('[data-cy="theme-switch-btn"]').click();
    cy.location("pathname").should("eq", "/");
    cy.get("h4").contains("Emoji Cipher");
  });
});
