// commands.js
// import 'cypress-promise/register';

// validate password
Cypress.Commands.add("validatePassword", (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
  const hasMinLength = password.length >= 8;

  expect(hasUppercase).to.be.true;
  expect(hasLowercase).to.be.true;
  expect(hasSpecialChar).to.be.true;
  expect(hasMinLength).to.be.true;
});

// login via ui
Cypress.Commands.add("loginViaUi", (user) => {
  cy.session(
    user,
    () => {
      cy.visit("/login");
      cy.get("#basic_email").type(user.email);
      cy.get("#basic_password").type(user.password);
      cy.validatePassword("Test@1234");
      cy.get("#basic_email_help > .ant-form-item-explain-error").should(
        "not.exist"
      );
      cy.get("#basic_password_help > .ant-form-item-explain-error").should(
        "not.exist"
      );
      cy.get(".ant-btn").click();
      // cy.get('h1').should('contain', 'jane.lane')
    },
    {
      validate: () => {
        // cy.getCookie("auth_key").should("exist");
      },
    }
  );
});

// login via api
Cypress.Commands.add("loginViaApi", (body, options = {}) => {
  cy.request({
    method: "POST",
    url: "http://localhost:5051/auth/login",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.data).to.have.property("token");

    window.localStorage.setItem("jwtToken", response.body.data.token);
    window.localStorage.setItem("name", response.body.data.name);
    window.localStorage.setItem("_id", response.body.data._id);
    
    cy.visit("/dashboard");
  });
});

Cypress.Commands.add("addUser", (body, options = {}) => {
  cy.request({
    method: "POST",
    url: "http://localhost:5051/auth/registerUser",
    body,
  }).then((response) => {
    alert("User added successfully");
    console.log("response", response);
  });
});
