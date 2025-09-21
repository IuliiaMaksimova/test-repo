import { By, until } from 'selenium-webdriver';
import basePage from './basePage.js';

class HeaderLocators {
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

class FooterLocators {
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

export default class baseNodePage extends basePage {
  constructor(driver, logger = null) {
    super(driver, logger);

    this.header = new HeaderLocators();
    this.footer = new FooterLocators();
  }

  async waitForHeader() {
    this.logger.info('Base: waitForHeader');
    await this.waitIsPresented(By.css('body'), 15000, 1000);
    const header = await this.waitIsPresented(this.header.container, 20000, 1000);
    await this.driver.wait(until.elementIsVisible(header), 10000);
  }

  async isElementVisible(locator) {
    this.logger.info(`Base: isElementVisible ${JSON.stringify(locator)}`);
    const element = await this.waitIsPresented(locator, 10000, 1000);
    return element.isDisplayed();
  }

  async clickElement(locator) {
    this.logger.info(`Base: clickElement ${JSON.stringify(locator)}`);
    const element = await this.waitIsPresented(locator, 10000, 1000);
    await this.driver.wait(until.elementIsVisible(element), 5000);
    await element.click();
  }

  async getAllFooterLinks() {
    this.logger.info(`Base: getAllFooterLinks`);
    await this.waitIsPresented(this.footer.allLinks, 10000, 1000);
    return this.driver.findElements(this.footer.allLinks);
  }

  async getAllHeaderLinks() {
    this.logger.info(`Base: getAllHeaderLinks`);
    await this.waitIsPresented(this.header.allLinks, 10000, 1000);
    return this.driver.findElements(this.header.allLinks);
  }
}
