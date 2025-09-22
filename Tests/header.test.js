import { expect } from 'chai';
import TestSteps from '../Utils/helpers/testSteps.js';
import { HEADER_BUTTONS_COUNT } from '../Utils/helpers/constants.js';

describe('Nodejs Header', function () {
  this.timeout(30000);

  let testSteps;

  before(async function () {
    testSteps = new TestSteps('Header');
    await testSteps.setup();
  });

  after(async function () {
    await testSteps.teardown();
  });

  beforeEach(function () {
    testSteps.setLogger(this.currentTest.fullTitle());
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

  it('Step 2: All header buttons are present and visible', async function () {
    if (testSteps.shouldSkipTest('Step2')) {
      this.skip();
    }

    try {
      await testSteps.step2_AllButtonsPresentAndVisible();

      const headerLinks = await testSteps.basePage.getAllHeaderLinks();
      expect(headerLinks.length).to.be.greaterThanOrEqual(HEADER_BUTTONS_COUNT);
    } catch (error) {
      testSteps.handleTestError('Step2', error);
    }
  });

  it('Step 3: Click Blog button', async function () {
    if (testSteps.shouldSkipTest('Step3')) {
      this.skip();
    }

    try {
      await testSteps.step3_ClickButton(testSteps.basePage.header.blogButton, 'Blog');
    } catch (error) {
      testSteps.handleTestError('Step3', error);
    }
  });

  it('Step 4: Navigate to Blog page', async function () {
    if (testSteps.shouldSkipTest('Step4')) {
      this.skip();
    }

    try {
      await testSteps.step4_NavigateToPage('/blog');
    } catch (error) {
      testSteps.handleTestError('Step4', error);
    }
  });

  it('Step 5: Blog page displays correctly', async function () {
    if (testSteps.shouldSkipTest('Step5')) {
      this.skip();
    }

    try {
      await testSteps.step5_PageDisplaysCorrectly();
    } catch (error) {
      testSteps.handleTestError('Step5', error);
    }
  });

  it('Step 6: Return to main page', async function () {
    if (testSteps.shouldSkipTest('Step6')) {
      this.skip();
    }

    try {
      await testSteps.step6_ReturnToMainPage();
    } catch (error) {
      testSteps.handleTestError('Step6', error);
    }
  });

  it('Step 7: Click Download button', async function () {
    if (testSteps.shouldSkipTest('Step7')) {
      this.skip();
    }

    try {
      await testSteps.step3_ClickButton(testSteps.basePage.header.downloadButton, 'Download');
    } catch (error) {
      testSteps.handleTestError('Step7', error);
    }
  });

  it('Step 8: Navigate to Download page', async function () {
    if (testSteps.shouldSkipTest('Step8')) {
      this.skip();
    }

    try {
      await testSteps.step4_NavigateToPage('/download');
    } catch (error) {
      testSteps.handleTestError('Step8', error);
    }
  });

  it('Step 9: Download page displays correctly', async function () {
    if (testSteps.shouldSkipTest('Step9')) {
      this.skip();
    }

    try {
      await testSteps.step5_PageDisplaysCorrectly();
    } catch (error) {
      testSteps.handleTestError('Step9', error);
    }
  });

  it('Step 10: Final return to main page', async function () {
    if (testSteps.shouldSkipTest('Step10')) {
      this.skip();
    }

    try {
      await testSteps.step6_ReturnToMainPage();
    } catch (error) {
      testSteps.handleTestError('Step10', error);
    }
  });
});
