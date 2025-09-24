import { captureOnFailure } from '../Utils/saveHelpers.js';

export function registerAfterEach(driver) {
  afterEach(async function () {
    if (this.currentTest.isFailed()) {
      const title = this.currentTest.fullTitle();
      const { screenshotPath, pagePath } = await captureOnFailure(driver, title);
      console.log('Saved failure artifacts:', screenshotPath, pagePath);
    }
  });
}
