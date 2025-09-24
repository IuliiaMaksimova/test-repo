import { Builder } from 'selenium-webdriver';
import { expect } from 'chai';
import BaseNodePage from '../../Pages/baseNodePage.js';
import { createTestLogger } from '../logger.js';
import { registerAfterEach } from '../afterEach.js';
import { ELEMENT_WAIT_TIMEOUT } from './constants.js';

class TestStateManager {
  constructor() {
    this.hasFailed = false;
  }

  markFailed() {
    this.hasFailed = true;
  }

  shouldSkip() {
    return this.hasFailed;
  }

  reset() {
    this.hasFailed = false;
  }
}

const testState = new TestStateManager();

class TestSteps {
  constructor(suiteName) {
    this.suiteName = suiteName;
    this.driver = null;
    this.basePage = null;
    this.logger = null;
  }

  async setup() {
    this.driver = await new Builder().forBrowser('chrome').build();
    this.basePage = new BaseNodePage(this.driver);
    await this.basePage.open();
    registerAfterEach(this.driver);
  }

  async teardown() {
    if (this.driver) {
      await this.driver.quit();
    }
  }

  setLogger(testTitle) {
    this.logger = createTestLogger(testTitle);
    this.basePage.logger = this.logger;
  }

  async executeStep(stepName, stepFunction) {
    this.logger.info(`${stepName}: Starting`);
    try {
      const result = await stepFunction();
      this.logger.info(`${stepName}: Completed successfully`);
      return result;
    } catch (error) {
      this.logger.info(`${stepName}: Failed - ${error.message}`);
      testState.markFailed();
      throw error;
    }
  }

  async step1_PageOpensAndDisplays() {
    return this.executeStep('Step 1: Page opens and displays', async () => {
      await this.basePage.waitForHeader();
      const body = await this.basePage.waitIsPresented({ using: 'css selector', value: 'body' });
      expect(body).to.exist;
    });
  }

  async step2_AllButtonsPresentAndVisible() {
    return this.executeStep('Step 2: All buttons present and visible', async () => {
      const [headerLinks, footerLinks] = await Promise.all([
        this.basePage.getAllHeaderLinks(),
        this.basePage.getAllFooterLinks(),
      ]);
      expect(headerLinks.length).to.be.greaterThan(0);
      expect(footerLinks.length).to.be.greaterThan(0);
    });
  }

  async step3_ClickButton(buttonLocator, buttonName) {
    return this.executeStep(`Step 3: Click ${buttonName}`, async () => {
      await this.basePage.clickElement(buttonLocator);
    });
  }

  async step4_NavigateToPage(expectedUrlPart) {
    return this.executeStep(`Step 4: Navigate to ${expectedUrlPart}`, async () => {
      await this.driver.wait(async () => {
        const url = await this.driver.getCurrentUrl();
        return url.includes(expectedUrlPart) || url.includes('openjsf') || url.includes('openjs');
      }, ELEMENT_WAIT_TIMEOUT);

      const url = await this.driver.getCurrentUrl();
      expect(url).to.match(new RegExp(`${expectedUrlPart}|openjsf|openjs`, 'i'));
    });
  }

  async step5_PageDisplaysCorrectly() {
    return this.executeStep('Step 5: Page displays correctly', async () => {
      const body = await this.basePage.waitIsPresented({ using: 'css selector', value: 'body' });
      expect(body).to.exist;

      const url = await this.driver.getCurrentUrl();
      const title = await this.driver.getTitle();

      if (url.includes('.pdf')) {
        expect(url).to.match(/privacy|security|openjsf|openjs/i);
      } else {
        expect(title).to.not.be.empty;
      }
    });
  }

  async step6_ReturnToMainPage() {
    return this.executeStep('Step 6: Return to main page', async () => {
      await this.basePage.goBack();
      const url = await this.driver.getCurrentUrl();
      expect(url).to.include('nodejs.org');
    });
  }

  shouldSkipTest(testName) {
    if (testState.shouldSkip()) {
      this.logger.info(`Skipping ${testName} due to previous failures`);
      return true;
    }
    return false;
  }

  handleTestError(testName, error) {
    this.logger.info(`Test ${testName} failed: ${error.message}`);
    testState.markFailed();
    throw error;
  }
}

export default TestSteps;
