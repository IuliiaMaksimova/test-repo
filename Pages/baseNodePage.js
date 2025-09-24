import { By, until } from 'selenium-webdriver';
import basePage, { HeaderLocators, FooterLocators } from './basePage.js';
import { DEFAULT_TIMEOUT, DEFAULT_MIN_WAIT_TIME } from '../Utils/helpers/constants.js';

export default class baseNodePage extends basePage {
  constructor(driver, logger = null) {
    super(driver, logger);

    this.header = new HeaderLocators();
    this.footer = new FooterLocators();
  }

  async open() {
    await this.openPage('https://nodejs.org/en');
  }

  async getAllFooterLinks() {
    this.logger.info(`Base: getAllFooterLinks`);
    await this.waitIsPresented(this.footer.allLinks, DEFAULT_TIMEOUT, DEFAULT_MIN_WAIT_TIME);
    return this.driver.findElements(this.footer.allLinks);
  }

  async getAllHeaderLinks() {
    this.logger.info(`Base: getAllHeaderLinks`);
    await this.waitIsPresented(this.header.allLinks, DEFAULT_TIMEOUT, DEFAULT_MIN_WAIT_TIME);
    return this.driver.findElements(this.header.allLinks);
  }
}
