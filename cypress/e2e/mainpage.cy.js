import selectors from "../fixtures/selectors.json";
const main = selectors.main;

describe("main page should be display properly", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display properly title of page", () => {
    cy.get(main.title).should("have.text", "Идёмвкино");
  });

  it("should display 7 days", () => {
    cy.get(main.days).should("have.length", 7);
  });

  it("should named first day as today", () => {
    cy.get(main.today).then(($els) => {
      const win = $els[0].ownerDocument.defaultView;
      const before = win.getComputedStyle($els[0], "before");
      const contentValue = before.getPropertyValue("content");
      expect(contentValue).to.eq('"Сегодня"');
    });
  });
});
