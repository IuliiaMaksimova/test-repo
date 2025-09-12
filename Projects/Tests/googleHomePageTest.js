import { Builder } from "selenium-webdriver";
import { expect } from "chai";
import GoogleHomePage from "../Pages/googleHomePage.js";

describe("Google Home Page", function () {
  this.timeout(30000);

  let driver;
  let googleHome;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    googleHome = new GoogleHomePage(driver);
    await googleHome.open();
  });

  after(async function () {
    await driver.quit();
  });

  it("search field is visible", async function () {
    const isVisible = await googleHome.isSearchInputDisplayed();
    expect(isVisible).to.be.true;
  });

  it("search query", async function () {
    const query = "Node.js";
    await googleHome.enterSearchQuery(query);
    const title = await googleHome.waitForResults(query);
    expect(title).to.contain(query);

  });

  it("results searching, results are visible", async function () {
    const query = "Node.js";
    const title = await googleHome.waitForResults(query);
    expect(title).to.contain(query);
  });
});
