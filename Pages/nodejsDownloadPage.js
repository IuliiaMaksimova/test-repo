import { By, until } from 'selenium-webdriver';
import baseNodePage from './baseNodePage.js';
import { ELEMENT_WAIT_TIMEOUT } from '../Utils/helpers/constants.js';

export default class NodejsDownloadPage extends baseNodePage {
  constructor(driver, logger) {
    super(driver, logger);
    this.pageTitle = By.css('h1');
    this.macOsButton = By.className(
      'index-module__chIz9G__button index-module__chIz9G__primary index-module__chIz9G__small w-full min-w-56 sm:w-auto'
    );
    this.primaryCtas = By.css('a[href*="/download"], button[class*="primary"], a[class*="button"]');
  }

  async isPageDisplayed() {
    this.logger.info('Download: isPageDisplayed - checking page content');
    await this.driver.wait(until.elementLocated(By.css('body')), ELEMENT_WAIT_TIMEOUT);
    this.logger.info('Download: body element found');

    const title = await this.driver.wait(until.elementLocated(this.pageTitle), ELEMENT_WAIT_TIMEOUT);
    this.logger.info('Download: page title found');

    const anyCta = await this.driver.findElements(this.primaryCtas);
    const macBtn = await this.driver.findElements(this.macOsButton);
    const titleVisible = await title.isDisplayed();
    const hasVisibleCta =
      (macBtn.length > 0 && (await macBtn[0].isDisplayed())) || (anyCta.length > 0 && (await anyCta[0].isDisplayed()));

    this.logger.info(`Download: title visible: ${titleVisible}, CTA visible: ${hasVisibleCta}`);
    return titleVisible && hasVisibleCta;
  }
}
