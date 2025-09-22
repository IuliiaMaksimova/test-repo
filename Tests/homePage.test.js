import { expect } from 'chai';
import TestSteps from '../Utils/helpers/testSteps.js';
import nodejsHomePage from '../Pages/nodejsHomePage.js';
import nodejsDownloadPage from '../Pages/nodejsDownloadPage.js';
import nodejsSupportPage from '../Pages/nodejsSupportPage.js';

describe('Nodejs Home Page', function () {
  this.timeout(30000);

  let testSteps;

  before(async function () {
    testSteps = new TestSteps('HomePage');
    await testSteps.setup();
  });

  after(async function () {
    await testSteps.teardown();
  });

  beforeEach(async function () {
    testSteps.setLogger(this.currentTest.fullTitle());
    this.nodeHome = new nodejsHomePage(testSteps.driver, testSteps.logger);
    this.downloadPage = new nodejsDownloadPage(testSteps.driver, testSteps.logger);
    this.supportPage = new nodejsSupportPage(testSteps.driver, testSteps.logger);
  });

  it('Step 1: Page opens and displays', async function () {
    if (testSteps.shouldSkipTest('Step1')) {
      this.skip();
    }

    try {
      await testSteps.step1_PageOpensAndDisplays();
    } catch (error) {
      testSteps.handleTestError('Step1', error);
    }
  });

  it('Step 2: Main text is displayed', async function () {
    if (testSteps.shouldSkipTest('Step2')) {
      this.skip();
    }

    try {
      testSteps.logger.info('Step 2: Checking if main text is displayed');

      const isVisible = await this.nodeHome.isMainTextDisplayed();
      expect(isVisible).to.be.true;

      testSteps.logger.info('Step 2: Main text is displayed successfully');
    } catch (error) {
      testSteps.handleTestError('Step2', error);
    }
  });

  it('Step 3: Get Node.js button is displayed', async function () {
    if (testSteps.shouldSkipTest('Step3')) {
      this.skip();
    }

    try {
      testSteps.logger.info('Step 3: Checking if Get Node.js button is displayed');

      const isVisible = await this.nodeHome.isGetNodeButtonDisplayed();
      expect(isVisible).to.be.true;

      testSteps.logger.info('Step 3: Get Node.js button is displayed successfully');
    } catch (error) {
      testSteps.handleTestError('Step3', error);
    }
  });

  it('Step 4: Click Get Node.js button', async function () {
    if (testSteps.shouldSkipTest('Step4')) {
      this.skip();
    }

    try {
      testSteps.logger.info('Step 4: Clicking Get Node.js button');

      await this.nodeHome.clickGetNodeButton();

      testSteps.logger.info('Step 4: Get Node.js button clicked successfully');
    } catch (error) {
      testSteps.handleTestError('Step4', error);
    }
  });

  it('Step 5: Navigate to Download page', async function () {
    if (testSteps.shouldSkipTest('Step5')) {
      this.skip();
    }

    try {
      await testSteps.step4_NavigateToPage('/download');
    } catch (error) {
      testSteps.handleTestError('Step5', error);
    }
  });

  it('Step 6: Download page displays correctly', async function () {
    if (testSteps.shouldSkipTest('Step6')) {
      this.skip();
    }

    try {
      testSteps.logger.info('Step 6: Checking if Download page displays correctly');

      const isPageVisible = await this.downloadPage.isPageDisplayed();
      expect(isPageVisible).to.be.true;

      testSteps.logger.info('Step 6: Download page displays correctly');
    } catch (error) {
      testSteps.handleTestError('Step6', error);
    }
  });

  it('Step 7: Return to main page', async function () {
    if (testSteps.shouldSkipTest('Step7')) {
      this.skip();
    }

    try {
      testSteps.logger.info('Step 7: Returning to main page');

      await this.downloadPage.goBack();

      testSteps.logger.info('Step 7: Successfully returned to main page');
    } catch (error) {
      testSteps.handleTestError('Step7', error);
    }
  });

  it('Step 8: Get Support button is displayed', async function () {
    if (testSteps.shouldSkipTest('Step8')) {
      this.skip();
    }

    try {
      testSteps.logger.info('Step 8: Checking if Get Support button is displayed');

      const isVisible = await this.nodeHome.isGetSupportButtonDisplayed();
      expect(isVisible).to.be.true;

      testSteps.logger.info('Step 8: Get Support button is displayed successfully');
    } catch (error) {
      testSteps.handleTestError('Step8', error);
    }
  });

  it('Step 9: Click Get Support button', async function () {
    if (testSteps.shouldSkipTest('Step9')) {
      this.skip();
    }

    try {
      testSteps.logger.info('Step 9: Clicking Get Support button');

      await this.nodeHome.clickGetSupportButton();

      testSteps.logger.info('Step 9: Get Support button clicked successfully');
    } catch (error) {
      testSteps.handleTestError('Step9', error);
    }
  });

  it('Step 10: Final return to main page', async function () {
    if (testSteps.shouldSkipTest('Step10')) {
      this.skip();
    }

    try {
      testSteps.logger.info('Step 10: Final return to main page');

      await this.nodeHome.goBack();

      testSteps.logger.info('Step 10: Successfully returned to main page');
    } catch (error) {
      testSteps.handleTestError('Step10', error);
    }
  });
});
