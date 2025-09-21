import { By, until } from 'selenium-webdriver';
import BaseNodePage from './baseNodePage.js';

export default class NodejsHomePage extends BaseNodePage {
  constructor(driver, logger) {
    super(driver, logger);
    this.mainText = By.css('h1, .hero, .main-content');
    this.buttonsContainer = By.className('layouts-module__mzYk8q__homeLayout');
    this.getNodeButton = By.css('.index-module__chIz9G__button.index-module__chIz9G__primary');
    this.getSupportButton = By.css('a[href$="/en/eol"]');
  }

  async open() {
    await this.driver.get('https://nodejs.org/en');
  }

  async isMainTextDisplayed() {
    this.logger.info('Home: isMainTextDisplayed');
    const element = await this.driver.findElement(this.mainText);
    const isVisible = await element.isDisplayed();
    this.logger.info(`Home: main text visible: ${isVisible}`);
    return isVisible;
  }

  async isGetNodeButtonDisplayed() {
    this.logger.info('Home: isGetNodeButtonDisplayed');
    const containers = await this.driver.findElements(this.buttonsContainer);
    if (containers.length === 0) {
      this.logger.info('Home: buttons container not found');
      return false;
    }

    const buttons = await this.driver.findElements(this.getNodeButton);
    const isVisible = buttons.length > 0 && (await buttons[0].isDisplayed());
    this.logger.info(`Home: Get Node button visible: ${isVisible}`);
    return isVisible;
  }

  async clickGetNodeButton() {
    this.logger.info('Home: clickGetNodeButton');
    const containers = await this.driver.findElements(this.buttonsContainer);
    if (containers.length === 0) throw new Error('Buttons container not found');

    const buttons = await this.driver.findElements(this.getNodeButton);
    if (buttons.length === 0) throw new Error('Get Node.js button not found');

    await buttons[0].click();
    this.logger.info('Home: Get Node.js button clicked, navigating to download page');
  }

  async isGetSupportButtonDisplayed() {
    this.logger.info('Home: isGetSupportButtonDisplayed');
    const buttons = await this.driver.findElements(this.getSupportButton);
    const isVisible = buttons.length > 0 && (await buttons[0].isDisplayed());
    this.logger.info(`Home: Get Support button visible: ${isVisible}`);
    return isVisible;
  }

  async clickGetSupportButton() {
    this.logger.info('Home: clickGetSupportButton');
    const buttons = await this.driver.findElements(this.getSupportButton);
    if (buttons.length === 0) throw new Error('Get Support button not found');

    const button = buttons[0];
    this.logger.info(`Home: Found ${buttons.length} Get Support button(s)`);

    const isDisplayed = await button.isDisplayed();
    const isEnabled = await button.isEnabled();
    this.logger.info(`Home: Button displayed: ${isDisplayed}, enabled: ${isEnabled}`);

    if (!isDisplayed) throw new Error('Get Support button is not displayed');
    if (!isEnabled) throw new Error('Get Support button is not enabled');

    const href = await button.getAttribute('href');
    const target = await button.getAttribute('target');
    this.logger.info(`Home: Button href: ${href}, target: ${target}`);

    try {
      await button.click();
      this.logger.info('Home: Get Support button clicked, navigating to support page');
    } catch (error) {
      this.logger.info(`Home: Click failed: ${error.message}, trying direct navigation`);
      await this.driver.get(href);
      this.logger.info('Home: Navigated directly to support page');
    }
  }

  async goBack() {
    this.logger.info('Home: goBack');
    await this.driver.navigate().back();
    await this.driver.wait(until.elementLocated(By.css('body')), 10000);
    this.logger.info('Home: navigated back to previous page');
  }
}
