import { Builder, until } from "selenium-webdriver";
import { expect } from "chai";
import GoogleHomePage from "../Pages/nodejsHomePage.js";
import { captureOnFailure } from "../saveOnFailure.js";
import nodejsHomePage from "../Pages/nodejsHomePage.js";

describe("Nodejs Home Page", function () {
  this.timeout(30000);

  let driver;
  let nodeHome;;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    nodeHome = new nodejsHomePage(driver);
    await nodeHome.open();
  });

  after(async function () {
    await driver.quit();
  });

  afterEach(async function () {
    if (this.currentTest.state === "failed") {
      const title = this.currentTest.fullTitle();
      const { screenshotPath, pagePath } = await captureOnFailure(driver, title);
      console.log("Saved failure artifacts:", screenshotPath, pagePath);
    }
  });

  it("should display main text", async function () {
    const isVisible = await nodeHome.isMainTextDisplayed();
    expect(isVisible).to.be.true;
  });

  it("should click Get Node.js button", async function () {
    const isVisible = await nodeHome.isGetNodeButtonDisplayed();
    expect(isVisible).to.be.true;

    await nodeHome.clickGetNodeButton();

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include("download");

await nodeHome.goBack();

await driver.wait(until.elementLocated(nodeHome.mainText), 5000);
});

  it("should click Get Support button", async function () {
  const isVisible = await nodeHome.isGetSupportButtonDisplayed();
  expect(isVisible).to.be.true;

  await nodeHome.clickGetSupportButton();

  const currentUrl = await driver.getCurrentUrl();
  expect(currentUrl).to.include("eol");

  });
});
