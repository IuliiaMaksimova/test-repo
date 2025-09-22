import { By, until } from 'selenium-webdriver';
import BaseNodePage from './baseNodePage.js';

export default class NodejsDownloadByHeaderPage extends BaseNodePage {
  constructor(driver, logger) {
    super(driver, logger);
    this.downloadButton = By.css('a[href="/en/download"]');
  }

  async isPageDisplayed() {
    this.logger.info('isPageDisplayed');
    await this.driver.wait(until.elementLocated(By.css('body')), 15000);
    const title = await this.driver.wait(until.elementLocated(this.downloadButton), 15000);
    const anyCta = await this.driver.findElements(this.downloadButton);
    const titleVisible = await title.isDisplayed();
    const hasVisibleCta =
      (this.downloadButton.length > 0 && (await macBtn[0].isDisplayed())) ||
      (anyCta.length > 0 && (await anyCta[0].isDisplayed()));
    return titleVisible && hasVisibleCta;
  }
}
