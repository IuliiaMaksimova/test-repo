import { expect } from 'chai';
import TestSteps from '../Utils/helpers/testSteps.js';
import { FOOTER_LINKS_MIN_COUNT, PAGE_LOAD_TIMEOUT } from '../Utils/helpers/constants.js';

describe('Nodejs Footer', function () {
  this.timeout(PAGE_LOAD_TIMEOUT);

  let testSteps;

  before(async function () {
    testSteps = new TestSteps('Footer');
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

  it('Step 2: All footer links are present and visible', async function () {
    if (testSteps.shouldSkipTest('Step2')) {
      this.skip();
    }

    try {
      await testSteps.step2_AllButtonsPresentAndVisible();

      const footerLinks = await testSteps.basePage.getAllFooterLinks();
      expect(footerLinks.length).to.be.greaterThan(FOOTER_LINKS_MIN_COUNT);
    } catch (error) {
      testSteps.handleTestError('Step2', error);
    }
  });

  it('Step 3: Click Privacy Policy link', async function () {
    if (testSteps.shouldSkipTest('Step3')) {
      this.skip();
    }

    try {
      await testSteps.step3_ClickButton(testSteps.basePage.footer.privacyPolicy, 'Privacy Policy');
    } catch (error) {
      testSteps.handleTestError('Step3', error);
    }
  });

  it('Step 4: Navigate to Privacy Policy page', async function () {
    if (testSteps.shouldSkipTest('Step4')) {
      this.skip();
    }

    try {
      await testSteps.step4_NavigateToPage('privacy');
    } catch (error) {
      testSteps.handleTestError('Step4', error);
    }
  });

  it('Step 5: Privacy Policy page displays correctly', async function () {
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

  it('Step 7: Click Security Policy link', async function () {
    if (testSteps.shouldSkipTest('Step7')) {
      this.skip();
    }

    try {
      await testSteps.step3_ClickButton(testSteps.basePage.footer.securityPolicy, 'Security Policy');
    } catch (error) {
      testSteps.handleTestError('Step7', error);
    }
  });

  it('Step 8: Navigate to Security Policy page', async function () {
    if (testSteps.shouldSkipTest('Step8')) {
      this.skip();
    }

    try {
      await testSteps.step4_NavigateToPage('security');
    } catch (error) {
      testSteps.handleTestError('Step8', error);
    }
  });

  it('Step 9: Security Policy page displays correctly', async function () {
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
