import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai';
import baseNodePage from '../Pages/baseNodePage.js';
import { createTestLogger } from '../Utils/logger.js';
import { registerAfterEach } from '../Utils/afterEach.js';
import { PAGE_LOAD_TIMEOUT, DEFAULT_TIMEOUT } from '../Utils/helpers/constants.js';

describe('Nodejs Footer', function () {
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

  it('Step 2: All footer links are present and visible', async function () {
    const footerLinks = await basePage.getAllFooterLinks();
    expect(footerLinks.length).to.be.greaterThan(0);
  });

  it('Step 3: Click Privacy Policy link', async function () {
    await basePage.clickElement(basePage.footer.privacyPolicy);

    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes('privacy') || url.includes('openjsf');
    }, DEFAULT_TIMEOUT);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.match(/privacy|openjsf/i);

    await basePage.goBack();
  });

  it('Step 4: Click Security Policy link', async function () {
    await basePage.clickElement(basePage.footer.securityPolicy);

    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes('security') || url.includes('openjsf');
    }, DEFAULT_TIMEOUT);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.match(/security|openjsf/i);

    await basePage.goBack();
  });
});
