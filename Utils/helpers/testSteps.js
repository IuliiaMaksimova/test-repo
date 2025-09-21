import { Builder } from 'selenium-webdriver';
import { expect } from 'chai';
import BaseNodePage from '../../Pages/baseNodePage.js';
import { createTestLogger } from '../logger.js';
import { registerAfterEach } from '../afterEach.js';

class TestStateManager {
  constructor() {
    this.failedTests = new Set();
    this.currentSuite = null;
  }

  setCurrentSuite(suiteName) {
    this.currentSuite = suiteName;
  }

  markTestAsFailed(testName) {
    this.failedTests.add(`${this.currentSuite}:${testName}`);
  }

  isTestFailed(testName) {
    return this.failedTests.has(`${this.currentSuite}:${testName}`);
  }

  hasAnyFailedTests() {
    return this.failedTests.size > 0;
  }

  getFailedTests() {
    return Array.from(this.failedTests);
  }

  reset() {
    this.failedTests.clear();
    this.currentSuite = null;
  }
}

const testStateManager = new TestStateManager();

export class TestSteps {
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
    testStateManager.setCurrentSuite(this.suiteName);
  }

  async teardown() {
    if (this.driver) {
      await this.driver.quit();
    }
  }

  setLogger(testTitle) {
    this.logger = createTestLogger(testTitle);
    this.basePage.setLogger(this.logger);
  }

  async step1_PageOpensAndDisplays() {
    this.logger.info('Step 1: Checking if page opens and displays');

    await this.basePage.waitForHeader();

    const bodyElement = await this.basePage.waitIsPresented({ using: 'css selector', value: 'body' });
    expect(bodyElement).to.exist;

    this.logger.info('Step 1: Page opened and displayed successfully');
    return true;
  }

  async step2_AllButtonsPresentAndVisible() {
    this.logger.info('Step 2: Checking if all buttons are present and visible');

    const headerLinks = await this.basePage.getAllHeaderLinks();
    expect(headerLinks.length).to.be.greaterThan(0);

    const footerLinks = await this.basePage.getAllFooterLinks();
    expect(footerLinks.length).to.be.greaterThan(0);

    this.logger.info('Step 2: All buttons are present and visible');
    return true;
  }

  async step3_ClickButton(buttonLocator, buttonName) {
    this.logger.info(`Step 3: Clicking ${buttonName} button`);

    await this.basePage.clickElement(buttonLocator);

    this.logger.info(`Step 3: ${buttonName} button clicked successfully`);
    return true;
  }

  async step4_NavigateToPage(expectedUrlPart) {
    this.logger.info(`Step 4: Navigating to page containing '${expectedUrlPart}'`);

    await this.driver.wait(async () => {
      const currentUrl = await this.driver.getCurrentUrl();
      return currentUrl.includes(expectedUrlPart) || currentUrl.includes('openjsf') || currentUrl.includes('openjs');
    }, 15000);

    const currentUrl = await this.driver.getCurrentUrl();
    const isExpectedPage =
      currentUrl.includes(expectedUrlPart) || currentUrl.includes('openjsf') || currentUrl.includes('openjs');
    expect(isExpectedPage).to.be.true;

    this.logger.info(`Step 4: Successfully navigated to page with URL: ${currentUrl}`);
    return true;
  }

  async step5_PageDisplaysCorrectly() {
    this.logger.info('Step 5: Checking if page displays correctly');

    const bodyElement = await this.basePage.waitIsPresented({ using: 'css selector', value: 'body' });
    expect(bodyElement).to.exist;

    const currentUrl = await this.driver.getCurrentUrl();
    const title = await this.driver.getTitle();

    if (currentUrl.includes('.pdf')) {
      this.logger.info(`Step 5: PDF file loaded successfully: ${currentUrl}`);
      expect(currentUrl).to.match(/privacy|security|openjsf|openjs/i);
    } else {
      expect(title).to.not.be.empty;
      this.logger.info(`Step 5: Page displays correctly with title: ${title}`);
    }

    this.logger.info(`Step 5: Page displays correctly - URL: ${currentUrl}, Title: ${title}`);
    return true;
  }

  async step6_ReturnToMainPage() {
    this.logger.info('Step 6: Returning to main page');

    await this.basePage.goBack();

    const currentUrl = await this.driver.getCurrentUrl();
    expect(currentUrl).to.include('nodejs.org');

    this.logger.info('Step 6: Successfully returned to main page');
    return true;
  }

  shouldSkipTest(testName) {
    if (testStateManager.hasAnyFailedTests()) {
      this.logger.info(`Skipping ${testName} due to previous test failures`);
      return true;
    }
    return false;
  }

  handleTestError(testName, error) {
    this.logger.info(`Test ${testName} failed: ${error.message}`);
    testStateManager.markTestAsFailed(testName);
    throw error;
  }
}

export default TestSteps;
