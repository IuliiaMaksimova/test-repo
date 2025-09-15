import { By, until } from "selenium-webdriver";

export default class NodejsBasePage {
  constructor(driver) {
    this.driver = driver;

    this.headerContainer = By.className(
      "index-module__MxFfiW__main hidden peer-checked:flex",
    );
    this.footerContainer = By.css("footer");

    // Header buttons
    this.learnButton = By.css('a[href="/en/learn"]');
    this.aboutButton = By.css('a[href="/en/about"]');
    this.downloadButton = By.css('a[href="/en/download"]');
    this.blogButton = By.css('a[href="/en/blog"]');
    this.docsButton = By.css('a[href="/docs/latest/api/"]');
    this.getInvolvedButton = By.css('a[href="/en/get-involved"]');
    this.certificationButton = By.css('a[href="/en/certification"]');

    // Footer links
    this.footerLatestLts = By.css('footer a[href*="/en/download/"]');
    this.footerLatestRelease = By.css('footer a[href*="/en/download/current"]');
    this.footerTrademarkPolicy = By.css('footer a[href*="trademark"]');
    this.footerPrivacyPolicy = By.css('footer a[href*="privacy"]');
    this.footerCodeOfConduct = By.css('footer a[href*="code-of-conduct"]');
    this.footerSecurityPolicy = By.css('footer a[href*="security"]');
    this.footerOpenJSFoundation = By.css('footer a[href*="openjsf"]');
    this.footerGithub = By.css('footer a[href*="github.com"]');
    this.footerDiscord = By.css('footer a[href*="discord"]');
    this.footerMastodon = By.css('footer a[href*="mastodon"]');
    this.footerBsky = By.css('footer a[href*="bsky"]');
    this.footerX = By.css(
      'footer a[href*="twitter.com"], footer a[href*="x.com"]',
    );
    this.footerSlack = By.css('footer a[href*="slack"]');
    this.footerLinkedIn = By.css('footer a[href*="linkedin"]');

    this.footerLinks = By.css("footer a");
    this.headerLinks = By.css("header a");
  }

  async open() {
    await this.driver.get("https://nodejs.org");
  }

  async waitForHeader() {
    await this.driver.wait(until.elementLocated(By.css("body")), 15000);
    const header = await this.driver.wait(
      until.elementLocated(this.headerContainer),
      20000,
    );
    await this.driver.wait(until.elementIsVisible(header), 10000);
  }

  async isElementVisible(locator) {
    const element = await this.driver.wait(
      until.elementLocated(locator),
      10000,
    );
    return await element.isDisplayed();
  }

  async clickElement(locator) {
    const element = await this.driver.wait(
      until.elementLocated(locator),
      10000,
    );
    await this.driver.wait(until.elementIsVisible(element), 5000);
    await element.click();
  }

  async getAllFooterLinks() {
    await this.driver.wait(until.elementsLocated(this.footerLinks), 10000);
    return await this.driver.findElements(this.footerLinks);
  }

  async getAllHeaderLinks() {
    await this.driver.wait(until.elementsLocated(this.headerLinks), 10000);
    return await this.driver.findElements(this.headerLinks);
  }
}
