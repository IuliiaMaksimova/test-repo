import { Builder, until } from "selenium-webdriver";
import { expect } from "chai";
import NodejsBasePage from "../Pages/baseNodePage.js";

describe("Nodejs Header and Footer", function () {
  this.timeout(40000);

  let driver;
  let basePage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    basePage = new NodejsBasePage(driver);
    await basePage.open();
  });

  after(async function () {
    await driver.quit();
  });

  it("should display all header buttons", async function () {
    await basePage.waitForHeader();
    expect(await basePage.isElementVisible(basePage.learnButton)).to.be.true;
    expect(await basePage.isElementVisible(basePage.aboutButton)).to.be.true;
    expect(await basePage.isElementVisible(basePage.downloadButton)).to.be.true;
    expect(await basePage.isElementVisible(basePage.blogButton)).to.be.true;
    expect(await basePage.isElementVisible(basePage.docsButton)).to.be.true;
    expect(await basePage.isElementVisible(basePage.getInvolvedButton)).to.be
      .true;
    expect(await basePage.isElementVisible(basePage.certificationButton)).to.be
      .true;
  });

  it("should display all footer links", async function () {
    const footerLinks = await basePage.getAllFooterLinks();
    expect(footerLinks.length).to.be.greaterThan(5);
  });

  it("should navigate when clicking a header button (Blog)", async function () {
    await basePage.clickElement(basePage.blogButton);

    await driver.wait(until.urlContains("/blog"), 15000);
    const url = await driver.getCurrentUrl();
    expect(url).to.include("/blog");
    await basePage.open();
  });

  it("should navigate when clicking a footer link (Privacy Policy)", async function () {
    await basePage.clickElement(basePage.footerPrivacyPolicy);
    await driver.wait(async () => {
      const current = await driver.getCurrentUrl();
      return current.includes("privacy") || current.includes("openjsf");
    }, 10000);
    const url = await driver.getCurrentUrl();
    expect(url.includes("privacy") || url.includes("openjsf")).to.be.true;
    await basePage.open();
  });
});
