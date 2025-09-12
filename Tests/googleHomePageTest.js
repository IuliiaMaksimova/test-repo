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

  it("searching Node.js", async function () {
    const query = "Node.js";
    await googleHome.enterSearchQuery(query);
    const links = await googleHome.waitForResults(query);
    expect(links).to.contain(query);
  });

  it("oficial link Node.js and redirect", async function () {
  const found = await googleHome.clickResultLink("nodejs.org");
  expect(found).to.be.true;

  const url = await driver.getCurrentUrl();
  expect(url).to.include("nodejs.org");
});
});
