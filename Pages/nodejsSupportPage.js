import { By, until } from "selenium-webdriver";
import NodejsBasePage from "./baseNodePage.js";

export default class NodejsSupportPage extends NodejsBasePage {
  constructor(driver) {
    super(driver);
    this.pageTitle = By.css("h1");
    this.upgradeButton = By.css("a[href='/en/download']");
  }

  async isPageDisplayed() {
    const title = await this.driver.wait(
      until.elementLocated(this.pageTitle),
      10000,
    );
    const upgradeButton = await this.driver.wait(
      until.elementLocated(this.upgradeButton),
      10000,
    );
    return (await title.isDisplayed()) && (await upgradeButton.isDisplayed());
  }
}
