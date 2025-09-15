import { By, until } from "selenium-webdriver";
import NodejsBasePage from "./baseNodePage.js";

export default class NodejsDownloadPage extends NodejsBasePage {
  constructor(driver) {
    super(driver); // ✅ правильный вызов
    this.pageTitle = By.css("h1");
    this.macOsButton = By.css("a[href*='.pkg']");
  }

  async isPageDisplayed() {
    const title = await this.driver.wait(
      until.elementLocated(this.pageTitle),
      15000,
    );
    const button = await this.driver.wait(
      until.elementLocated(this.macOsButton),
      10000,
    );
    return (await title.isDisplayed()) && (await button.isDisplayed());
  }

  async goBack() {
    await this.driver.navigate().back();
    await this.driver.wait(
      until.elementLocated(By.className("special")),
      10000,
    );
  }
}
