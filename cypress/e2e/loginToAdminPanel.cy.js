import selectors from "../fixtures/selectors.json";
import logindata from "../fixtures/logindata.json";
const login = selectors.login;

describe("login page to admin page should work properly", () => {
  beforeEach(() => {
    cy.visit("/admin");
  });

  it("should display properly title of page", () => {
    cy.get(login.title).should("have.text", "Идёмвкино");
  });

  it("should display properly subtitle of page", () => {
    cy.get(login.subtitle).should("have.text", "Администраторррская");
  });

  it("should display properly login form", () => {
    cy.get(login.formTitle).should("have.text", "Авторизация");
    cy.get(login.labelForEmail).should("contain.text", "E-mail");
    cy.get(login.inputEmail).should(
      "have.attr",
      "placeholder",
      "example@domain.xyz"
    );
    cy.get(login.labelForPass).should("contain.text", "Пароль");
    cy.get(login.submit).should("have.attr", "value", "Авторизоваться");
  });

  logindata.forEach((logindata) => {
    it("DDT auth tests: " + logindata.name, () => {
      if (logindata.data.email != null) {
        cy.get(login.inputEmail).type(`${logindata.data.email}`);
      }
      if (logindata.data.pass != null) {
        cy.get(login.inputPass).type(`${logindata.data.pass}`);
      }
      cy.get(login.submit).click();

      if (logindata.name == "happyPath") {
        cy.get(selectors.admin.section)
          .first()
          .should("have.text", "Управление залами");
      }

      if (logindata.name == "sadPathNullEmail") {
        cy.get(login.inputEmail)
          .then((element) => element[0].checkValidity())
          .should("be.false");
        cy.get(login.inputEmail)
          .then((element) => element[0].validationMessage)
          .should("contain", "Заполните это поле");
      }

      if (logindata.name == "sadPathNullPass") {
        cy.get(login.inputPass)
          .then((element) => element[0].checkValidity())
          .should("be.false");
        cy.get(login.inputPass)
          .then((element) => element[0].validationMessage)
          .should("contain", "Заполните это поле");
      }

      if (logindata.name == "sadPathWrongPass") {
        cy.get(selectors.auth.error).should("have.text", "Ошибка авторизации!");
      }
    });
  });
});
