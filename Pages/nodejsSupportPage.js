import { By, until } from 'selenium-webdriver';
import baseNodePage from './baseNodePage.js';
import { ELEMENT_WAIT_TIMEOUT } from '../Utils/helpers/constants.js';

export default class NodejsSupportPage extends baseNodePage {
  constructor(driver, logger) {
    super(driver, logger);
    this.pageTitle = By.css('h1');
    this.upgradeButton = By.css("a[href*='/download']");
    this.supportLinks = By.css('a[href*="security"], a[href*="support"], a[href*="help"], a[href*="eol"]');
  }

  async isPageDisplayed() {
    this.logger.info('Support: isPageDisplayed - checking page content');
    await this.driver.wait(until.elementLocated(By.css('body')), ELEMENT_WAIT_TIMEOUT);
    this.logger.info('Support: body element found');

    const title = await this.driver.wait(until.elementLocated(this.pageTitle), ELEMENT_WAIT_TIMEOUT);
    this.logger.info('Support: page title found');

    const titleVisible = await title.isDisplayed();
    const links = await this.driver.findElements(this.supportLinks);
    const linkVisible = links.length > 0 ? await links[0].isDisplayed() : false;

    this.logger.info(`Support: title visible: ${titleVisible}, support links visible: ${linkVisible}`);
    return titleVisible && linkVisible;
  }
}
