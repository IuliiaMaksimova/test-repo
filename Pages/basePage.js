import { By, until } from 'selenium-webdriver';
import { DEFAULT_TIMEOUT, DEFAULT_MIN_WAIT_TIME } from '../Utils/helpers/constants.js';

export default class basePage {
  constructor(driver, logger = null) {
    this.driver = driver;
    this.logger = logger || { info: () => {} };
  }

  async isElementVisible(locator) {
    this.logger.info(`Base: isElementVisible ${JSON.stringify(locator)}`);
    const element = await this.waitIsPresented(locator, 10000, 1000);
    return element.isDisplayed();
  }

  async waitForHeader() {
    this.logger.info('Base: waitForHeader');
    await this.waitIsPresented(By.css('body'), 15000, 1000);
    const header = await this.waitIsPresented(By.css('.index-module__MxFfiW__main.hidden.peer-checked\\:flex'), 20000, 1000);
    await this.driver.wait(until.elementIsVisible(header), 10000);
  }

  setLogger(logger) {
    this.logger = logger && typeof logger.info === 'function' ? logger : { info: () => {} };
  }

  async open() {
    this.logger.info('Base: open https://nodejs.org');
    await this.driver.get('https://nodejs.org');
  }

  async goBack() {
    this.logger.info('Base: goBack');
    const handles = await this.driver.getAllWindowHandles();
    if (handles.length > 1) {
      await this.driver.close();
      const remaining = await this.driver.getAllWindowHandles();
      const target = remaining[0];
      await this.driver.switchTo().window(target);
    } else {
      await this.driver.navigate().back();
    }
    await this.driver.wait(until.elementLocated(By.css('body')), 10000);
  }

  async waitIsPresented(locator, timeout = DEFAULT_TIMEOUT, minWaitTime = DEFAULT_MIN_WAIT_TIME) {
    this.logger.info(`Base: waitIsPresented ${JSON.stringify(locator)} (timeout: ${timeout}ms, minWait: ${minWaitTime}ms)`);

    const startTime = Date.now();

    try {
      const element = await this.driver.wait(until.elementLocated(locator), timeout);

      const elapsedTime = Date.now() - startTime;

      this.logger.info(`Base: Element found in ${elapsedTime}ms`);

      return element;
    } catch (error) {
      const elapsedTime = Date.now() - startTime;
      this.logger.info(`Base: waitIsPresented failed after ${elapsedTime}ms: ${error.message}`);
      throw error;
    }
  }

  async isElementPresented(locator, timeout = DEFAULT_TIMEOUT, minWaitTime = DEFAULT_MIN_WAIT_TIME) {
    this.logger.info(`Base: isElementPresented ${JSON.stringify(locator)} (timeout: ${timeout}ms, minWait: ${minWaitTime}ms)`);

    try {
      await this.waitIsPresented(locator, timeout, minWaitTime);
      return true;
    } catch (error) {
      this.logger.info(`Base: Element not presented: ${error.message}`);
      return false;
    }
  }
}
