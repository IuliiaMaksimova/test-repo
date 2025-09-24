import { Builder } from 'selenium-webdriver';
import { expect } from 'chai';
import nodejsHomePage from '../Pages/nodejsHomePage.js';
import nodejsDownloadPage from '../Pages/nodejsDownloadPage.js';
import nodejsSupportPage from '../Pages/nodejsSupportPage.js';
import { captureOnFailure } from '../Utils/saveHelpers.js';
import { createTestLogger } from '../Utils/logger.js';
import { registerAfterEach } from '../Utils/afterEach.js';
import { PAGE_LOAD_TIMEOUT } from '../Utils/helpers/constants.js';

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
  });

  beforeEach(async function () {
    nodeHome = new nodejsHomePage(driver, logger);
    downloadPage = new nodejsDownloadPage(driver, logger);
    supportPage = new nodejsSupportPage(driver, logger);
    await nodeHome.open();
  });

  after(async function () {
    await driver.quit();
  });

  it('should display home page', async function () {
    const isVisible = await nodeHome.isMainTextDisplayed();
    expect(isVisible).to.be.true;
  });

  it('should display main text', async function () {
    const isVisible = await nodeHome.isMainTextDisplayed();
    expect(isVisible).to.be.true;
  });

  it('should click Get Node.js button', async function () {
    expect(await nodeHome.isGetNodeButtonDisplayed()).to.be.true;
    await nodeHome.clickGetNodeButton();

    const isDownloadPageVisible = await downloadPage.isPageDisplayed();
    expect(isDownloadPageVisible).to.be.true;

    await downloadPage.goBack();
  });

  it('should click Get Support button', async function () {
    expect(await nodeHome.isGetSupportButtonDisplayed()).to.be.true;
    await nodeHome.clickGetSupportButton();

    const isSupportPageVisible = await supportPage.isPageDisplayed();
    expect(isSupportPageVisible).to.be.true;

    await nodeHome.goBack();
  });
});
