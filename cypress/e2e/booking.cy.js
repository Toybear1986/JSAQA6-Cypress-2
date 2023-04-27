import selectors from "../fixtures/selectors.json";
import logindata from "../fixtures/logindata.json";
const login = selectors.login;
const main = selectors.main;
const admin = selectors.admin;
const hallSchema = selectors.hallSchema;
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

describe("booking in accessible hall if name get from admin panel", () => {
  it("get hall from admin and book seat", () => {
    cy.visit("/admin");
    const index = logindata.map((o) => o.name).indexOf("happyPath");
    cy.get(login.inputEmail).type(logindata[index].data.email);
    cy.get(login.inputPass).type(logindata[index].data.pass);
    cy.get(login.submit).click();
    cy.get(admin.section).first().should("have.text", "Управление залами");
    cy.get(admin.activeHall).invoke("text").as("hall");
    cy.get("@hall").then((hall) => {
      cy.get(admin.sales + '"' + hall + '"]').click();
      cy.get(admin.salesButton).should("have.text", "Закрыть продажу билетов");
      cy.visit("/");
      cy.get(main.days).last().click();
      cy.get(main.hallWithActiveSeances).contains('div',hall).within(() => {
        cy.get(main.seanceTime).last().click();
      });
      cy.get(hallSchema.selectRow + `(${random(1, 10)})`)
        .find(hallSchema.selectChair + `(${random(1, 10)})`)
        .click();
      cy.get(hallSchema.subminBooking).click();
    });
  });
});
