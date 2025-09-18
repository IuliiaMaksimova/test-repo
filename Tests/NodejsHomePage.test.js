import { Builder } from "selenium-webdriver";
import { expect } from "chai";
import nodejsHomePage from "../Pages/nodejsHomePage.js";
import nodejsDownloadPage from "../Pages/nodejsDownloadPage.js";
import nodejsSupportPage from "../Pages/nodejsSupportPage.js";
import { captureOnFailure } from "../Utils/saveHelpers.js";
import { createTestLogger } from "../Utils/logger.js";

describe("Nodejs Home Page", function () {
  this.timeout(30000);

  let driver;
  let nodeHome;
  let downloadPage;
  let supportPage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  beforeEach(async function () {
    const logger = createTestLogger(this.currentTest.fullTitle());
    nodeHome = new nodejsHomePage(driver, logger);
    downloadPage = new nodejsDownloadPage(driver, logger);
    supportPage = new nodejsSupportPage(driver, logger);
    await nodeHome.open();
  });

  after(async function () {
    await driver.quit();
  });

  afterEach(async function () {
    if (this.currentTest.isFailed()) {
      const title = this.currentTest.fullTitle();
      const { screenshotPath, pagePath } = await captureOnFailure(
        driver,
        title,
      );
      console.log("Saved failure artifacts:", screenshotPath, pagePath);
    }
  });

  it("should display main text", async function () {
    const isVisible = await nodeHome.isMainTextDisplayed();
    expect(isVisible).to.be.true;
  });

  it("should click Get Node.js button", async function () {
    expect(await nodeHome.isGetNodeButtonDisplayed()).to.be.true;
    await nodeHome.clickGetNodeButton();

    const isDownloadPageVisible = await downloadPage.isPageDisplayed();
    expect(isDownloadPageVisible).to.be.true;

    await downloadPage.goBack();
  });

  it("should click Get Support button", async function () {
    expect(await nodeHome.isGetSupportButtonDisplayed()).to.be.true;
    await nodeHome.clickGetSupportButton();

    const isSupportPageVisible = await supportPage.isPageDisplayed();
    expect(isSupportPageVisible).to.be.true;

    await nodeHome.goBack();
  });
});
