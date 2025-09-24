import { By, until } from 'selenium-webdriver';
import baseNodePage from './baseNodePage.js';
import { ELEMENT_WAIT_TIMEOUT } from '../Utils/helpers/constants.js';

export default class NodejsSupportPage extends baseNodePage {
  constructor(driver, logger) {
    super(driver, logger);
    this.securityButton = By.css('a[href="/en/security/policy"]');
  }

  async isPageDisplayed() {
    this.logger.info('isPageDisplayed');
    await this.driver.wait(until.elementLocated(By.css('body')), ELEMENT_WAIT_TIMEOUT);
    const title = await this.driver.wait(until.elementLocated(this.securityButton), ELEMENT_WAIT_TIMEOUT);
    const titleVisible = await title.isDisplayed();
    const links = await this.driver.findElements(this.securityButton);
    const linkVisible = links.length > 0 ? await links[0].isDisplayed() : false;

    return titleVisible && linkVisible;
  }
}
