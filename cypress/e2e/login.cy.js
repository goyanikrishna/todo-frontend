describe("The Login Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // it("login via ui command", () => {
  //   cy.loginViaUi({
  //     email: "test@yopmail.com",
  //     password: "Test@1234",
  //   });
  // });

  it("login via api", () => {
    cy.loginViaApi({
      email: "test@yopmail.com",
      password: "Test@1234",
    });
  });

  // it('sets auth cookie when logging in via form submission', function () {
  //   cy.get('#basic_email').type("test@yopmail.com");
  //   cy.get('#basic_password').type("Test@1234");
  //   cy.validatePassword("Test@1234");
  //   cy.get('#basic_email_help > .ant-form-item-explain-error').should("not.exist");
  //   cy.get('#basic_password_help > .ant-form-item-explain-error').should("not.exist");
  //   cy.get('.ant-btn').click();

  //   // // {enter} causes the form to submit
  //   // cy.get('input[name=password]').type(`${password}{enter}`)

  //   // // we should be redirected to /dashboard
  //   // cy.url().should('include', '/dashboard')

  //   // // our auth cookie should be present
  //   // cy.getCookie('your-session-cookie').should('exist')

  //   // // UI should reflect this user being logged in
  //   // cy.get('h1').should('contain', 'jane.lane')
  // })
});
