import { By, until } from "selenium-webdriver";
import NodejsBasePage from "./baseNodePage.js";
import BaseNodePage from "./baseNodePage.js";

export default class NodejsDownloadPage extends BaseNodePage {
  constructor(driver, logger) {
    super(driver, logger);
    this.pageTitle = By.css("h1");
    this.macOsButton = By.className(
      "index-module__chIz9G__button index-module__chIz9G__primary index-module__chIz9G__small w-full min-w-56 sm:w-auto",
    );
    this.primaryCtas = By.css(
      'a[href*="/download"], button[class*="primary"], a[class*="button"]',
    );
  }

  async isPageDisplayed() {
    this.logger("Download: isPageDisplayed"); // Ensure the page is not empty and key components are present
    await this.driver.wait(until.elementLocated(By.css("body")), 15000);
    const title = await this.driver.wait(
      until.elementLocated(this.pageTitle),
      15000,
    );
    const anyCta = await this.driver.findElements(this.primaryCtas);
    const macBtn = await this.driver.findElements(this.macOsButton);
    const titleVisible = await title.isDisplayed();
    const hasVisibleCta =
      (macBtn.length > 0 && (await macBtn[0].isDisplayed())) ||
      (anyCta.length > 0 && (await anyCta[0].isDisplayed()));
    return titleVisible && hasVisibleCta;
  }

  async goBack() {
    await this.driver.navigate().back();
    await this.driver.wait(until.elementLocated(By.css("body")), 10000);
  }
}
