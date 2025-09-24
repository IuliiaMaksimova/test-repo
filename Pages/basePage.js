import { By, until } from 'selenium-webdriver';
import {
  DEFAULT_TIMEOUT,
  DEFAULT_MIN_WAIT_TIME,
  ELEMENT_WAIT_TIMEOUT,
  HEADER_WAIT_TIMEOUT,
  LONG_TIMEOUT,
} from '../Utils/helpers/constants.js';
import { Logger } from 'simple-node-logger';

/** @type {Logger} */
this.logger = logger;

export default class basePage {
  constructor(driver, logger = null) {
    this.driver = driver;
    this.logger = Logger;
  }

  async isElementVisible(locator) {
    this.logger.info(`Base: isElementVisible ${JSON.stringify(locator)}`);
    const element = await this.waitIsPresented(locator, DEFAULT_TIMEOUT, DEFAULT_MIN_WAIT_TIME);
    return element.isDisplayed();
  }

  async clickElement(locator) {
    this.logger.info(`Base: clickElement ${JSON.stringify(locator)}`);
    const element = await this.waitIsPresented(locator, DEFAULT_TIMEOUT, DEFAULT_MIN_WAIT_TIME);
    await this.driver.wait(until.elementIsVisible(element), LONG_TIMEOUT);
    await element.click();
  }

  async waitForHeader() {
    this.logger.info('Base: waitForHeader');
    await this.waitIsPresented(By.css('body'), ELEMENT_WAIT_TIMEOUT, DEFAULT_MIN_WAIT_TIME);
    const header = await this.waitIsPresented(
      By.css('.index-module__MxFfiW__main.hidden.peer-checked\\:flex'),
      HEADER_WAIT_TIMEOUT,
      DEFAULT_MIN_WAIT_TIME
    );
    await this.driver.wait(until.elementIsVisible(header), DEFAULT_TIMEOUT);
  }

  async openPage(url) {
    this.logger.info(`Base: open ${url}`);
    await this.driver.get(url);
  }

  async goBack() {
    this.logger.info('Base: goBack');
    const handles = await this.driver.getAllWindowHandles();
    if (handles.length > 1) {
      await this.driver.close();
      const remaining = await this.driver.getAllWindowHandles();
      const target = remaining[0];
      await this.driver.switchTo().window(target);
    } else {
      await this.driver.navigate().back();
    }
    await this.driver.wait(until.elementLocated(By.css('body')), DEFAULT_TIMEOUT);
  }

  async waitIsPresented(locator, timeout = DEFAULT_TIMEOUT, minWaitTime = DEFAULT_MIN_WAIT_TIME) {
    this.logger.info(`Base: waitIsPresented ${JSON.stringify(locator)} (timeout: ${timeout}ms, minWait: ${minWaitTime}ms)`);

    const startTime = Date.now();

    try {
      const element = await this.driver.wait(until.elementLocated(locator), timeout);

      const elapsedTime = Date.now() - startTime;

      this.logger.info(`Base: Element found in ${elapsedTime}ms`);

      return element;
    } catch (error) {
      const elapsedTime = Date.now() - startTime;
      this.logger.info(`Base: waitIsPresented failed after ${elapsedTime}ms: ${error.message}`);
      throw error;
    }
  }

  async isElementPresented(locator, timeout = DEFAULT_TIMEOUT, minWaitTime = DEFAULT_MIN_WAIT_TIME) {
    this.logger.info(`Base: isElementPresented ${JSON.stringify(locator)} (timeout: ${timeout}ms, minWait: ${minWaitTime}ms)`);

    try {
      await this.waitIsPresented(locator, timeout, minWaitTime);
      return true;
    } catch (error) {
      this.logger.info(`Base: Element not presented: ${error.message}`);
      return false;
    }
  }
}

export class HeaderLocators {
  constructor() {
    this.container = By.className('index-module__MxFfiW__main hidden peer-checked:flex');
    this.learnButton = By.css('a[href="/en/learn"]');
    this.aboutButton = By.css('a[href="/en/about"]');
    this.downloadButton = By.css('a[href="/en/download"]');
    this.blogButton = By.css('a[href="/en/blog"]');
    this.docsButton = By.css('a[href$="/docs/latest/api/"]');
    this.getContributeButton = By.className('index-module__Caicaq__navItem index-module__Caicaq__nav');
    this.certificationButton = By.css('a[href$="/openjs/"]');
    this.allLinks = By.css('nav a');
  }
}

export class FooterLocators {
  constructor() {
    this.container = By.css('footer');
    this.latestLts = By.css('footer a[href*="/en/download/"]');
    this.latestRelease = By.css('footer a[href*="/en/download/current"]');
    this.trademarkPolicy = By.css('footer a[href*="trademark"]');
    this.privacyPolicy = By.css('footer a[href*="privacy"]');
    this.codeOfConduct = By.css('footer a[href*="code-of-conduct"]');
    this.securityPolicy = By.css('footer a[href*="security"]');
    this.openJSFoundation = By.css('footer a[href*="openjsf"]');
    this.github = By.css('footer a[href*="github.com"]');
    this.discord = By.css('footer a[href*="discord"]');
    this.mastodon = By.css('footer a[href*="mastodon"]');
    this.bsky = By.css('footer a[href*="bsky"]');
    this.x = By.css('footer a[href*="twitter.com"], footer a[href*="x.com"]');
    this.slack = By.css('footer a[href*="slack"]');
    this.linkedIn = By.css('footer a[href*="linkedin"]');
    this.allLinks = By.css('footer a');
  }
}
