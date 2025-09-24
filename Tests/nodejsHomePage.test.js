import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai';
import nodejsHomePage from '../Pages/nodejsHomePage.js';
import nodejsDownloadPage from '../Pages/nodejsDownloadPage.js';
import nodejsSupportPage from '../Pages/nodejsSupportPage.js';
import { captureOnFailure } from '../Utils/saveHelpers.js';
import { createTestLogger } from '../Utils/logger.js';
import { registerAfterEach } from '../Utils/afterEach.js';
import { PAGE_LOAD_TIMEOUT, DEFAULT_TIMEOUT } from '../Utils/helpers/constants.js';

describe('Nodejs Home Page', function () {
  this.timeout(PAGE_LOAD_TIMEOUT);

  let driver;
  let nodeHome;
  let downloadPage;
  let supportPage;
  let logger;

  before(async function () {
    logger = createTestLogger(this.currentTest.fullTitle());
    driver = await new Builder().forBrowser('chrome').build();
    registerAfterEach(driver);
    nodeHome = new nodejsHomePage(driver, logger);
    downloadPage = new nodejsDownloadPage(driver, logger);
    supportPage = new nodejsSupportPage(driver, logger);
    await nodeHome.open();
  });

  after(async function () {
    await driver.quit();
  });

  it('Step 1: Page opens and displays', async function () {
    await nodeHome.waitIsPresented(By.css('body'));
    const isPageLoaded = await driver.findElement(By.css('body')).isDisplayed();
    expect(isPageLoaded).to.be.true;
  });

  it('Step 2: Main text is displayed', async function () {
    const isVisible = await nodeHome.isMainTextDisplayed();
    expect(isVisible).to.be.true;
  });

  it('Step 3: Get Node.js button is displayed', async function () {
    const isVisible = await nodeHome.isGetNodeButtonDisplayed();
    expect(isVisible).to.be.true;
  });

  it('Step 4: Click Get Node.js button', async function () {
    await nodeHome.clickGetNodeButton();

    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes('download') || url.includes('openjsf');
    }, DEFAULT_TIMEOUT);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.match(/download|openjsf/i);

    await nodeHome.goBack();
  });

  it('Step 5: Get Support button is displayed', async function () {
    const isVisible = await nodeHome.isGetSupportButtonDisplayed();
    expect(isVisible).to.be.true;
  });

  it('Step 6: Click Get Support button', async function () {
    await nodeHome.clickGetSupportButton();

    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes('eol') || url.includes('support') || url.includes('openjsf');
    }, DEFAULT_TIMEOUT);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.match(/eol|support|openjsf/i);

    await nodeHome.goBack();
  });
});
