import { By, until } from 'selenium-webdriver';
import BaseNodePage from './baseNodePage.js';

export default class NodejsSupportPage extends BaseNodePage {
  constructor(driver, logger) {
    super(driver, logger);
    this.pageTitle = By.css('h1');
    this.upgradeButton = By.css("a[href*='/download']");
    this.supportLinks = By.css('a[href*="security"], a[href*="support"], a[href*="help"], a[href*="eol"]');
  }

  async isPageDisplayed() {
    this.logger.info('Support: isPageDisplayed - checking page content');
    await this.driver.wait(until.elementLocated(By.css('body')), 15000);
    this.logger.info('Support: body element found');

    const title = await this.driver.wait(until.elementLocated(this.pageTitle), 15000);
    this.logger.info('Support: page title found');

    const titleVisible = await title.isDisplayed();
    const links = await this.driver.findElements(this.supportLinks);
    const linkVisible = links.length > 0 ? await links[0].isDisplayed() : false;

    this.logger.info(`Support: title visible: ${titleVisible}, support links visible: ${linkVisible}`);
    return titleVisible && linkVisible;
  }
}
