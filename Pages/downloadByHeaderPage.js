import { By, until } from 'selenium-webdriver';
import baseNodePage from './baseNodePage.js';
import { ELEMENT_WAIT_TIMEOUT } from '../Utils/helpers/constants.js';

export default class NodejsDownloadByHeaderPage extends baseNodePage {
  constructor(driver, logger) {
    super(driver, logger);
    this.downloadButton = By.css('a[href="/en/download"]');
  }

  async isPageDisplayed() {
    this.logger.info('isPageDisplayed');
    await this.driver.wait(until.elementLocated(By.css('body')), ELEMENT_WAIT_TIMEOUT);
    const title = await this.driver.wait(until.elementLocated(this.downloadButton), ELEMENT_WAIT_TIMEOUT);
    const anyCta = await this.driver.findElements(this.downloadButton);
    const titleVisible = await title.isDisplayed();
    const hasVisibleCta =
      (this.downloadButton.length > 0 && (await macBtn[0].isDisplayed())) ||
      (anyCta.length > 0 && (await anyCta[0].isDisplayed()));
    return titleVisible && hasVisibleCta;
  }
}
