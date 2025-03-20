describe("Add User Page", () => {
  beforeEach(() => {
    cy.visit("/dashboard");
  });

  it("Add user via api", () => {
    cy.addUser({
      name: "User 17",
      email: "test17@yopmail.com",
      phoneNumber: 1234567890,
      gender: "Female",
    });
  });
});
