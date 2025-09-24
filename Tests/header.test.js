import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai';
import baseNodePage from '../Pages/baseNodePage.js';
import { createTestLogger } from '../Utils/logger.js';
import { registerAfterEach } from '../Utils/afterEach.js';
import { PAGE_LOAD_TIMEOUT, DEFAULT_TIMEOUT, HEADER_BUTTONS_COUNT } from '../Utils/helpers/constants.js';

describe('Nodejs Header', function () {
  this.timeout(PAGE_LOAD_TIMEOUT);

  let driver;
  let basePage;
  let logger;

  before(async function () {
    logger = createTestLogger(this.currentTest.fullTitle());
    driver = await new Builder().forBrowser('chrome').build();
    registerAfterEach(driver);
    basePage = new baseNodePage(driver, logger);
    await basePage.open();
  });

  after(async function () {
    await driver.quit();
  });

  it('Step 1: Page opens and displays', async function () {
    await basePage.waitIsPresented(By.css('body'));
    const isPageLoaded = await driver.findElement(By.css('body')).isDisplayed();
    expect(isPageLoaded).to.be.true;
  });

  it('Step 2: All header buttons are present and visible', async function () {
    const headerLinks = await basePage.getAllHeaderLinks();
    expect(headerLinks.length).to.be.greaterThanOrEqual(HEADER_BUTTONS_COUNT);
  });

  it('Step 3: Click Blog button', async function () {
    await basePage.clickElement(basePage.header.blogButton);

    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes('blog') || url.includes('openjsf');
    }, DEFAULT_TIMEOUT);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.match(/blog|openjsf/i);

    await basePage.goBack();
  });

  it('Step 4: Click Download button', async function () {
    await basePage.clickElement(basePage.header.downloadButton);

    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes('download') || url.includes('openjsf');
    }, DEFAULT_TIMEOUT);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.match(/download|openjsf/i);

    await basePage.goBack();
  });
});
