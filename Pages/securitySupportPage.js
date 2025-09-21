import { By, until } from 'selenium-webdriver';
import BaseNodePage from './baseNodePage.js';

export default class NodejsSupportPage extends BaseNodePage {
  constructor(driver, logger) {
    super(driver, logger);
    this.securityButton = By.css('a[href="/en/security/policy"]');
  }

  async isPageDisplayed() {
    this.logger.info('isPageDisplayed');
    await this.driver.wait(until.elementLocated(By.css('body')), 15000);
    const title = await this.driver.wait(until.elementLocated(this.securityButton), 15000);
    const titleVisible = await title.isDisplayed();
    const links = await this.driver.findElements(this.securityButton);
    const linkVisible = links.length > 0 ? await links[0].isDisplayed() : false;

    return titleVisible && linkVisible;
  }
}
