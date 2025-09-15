import { By, until } from "selenium-webdriver";

export default class NodejsDownloadPage extends NodejsBasePage {
  constructor(driver) {
    this.driver = driver;
    this.pageTitle = By.css("h1");
    this.macOsButton = By.css("a[href*='.pkg']");
  }

  async isPageDisplayed() {
    await this.driver.wait(until.elementLocated(this.pageTitle), 15000);
    const title = await this.driver.findElement(this.pageTitle);
    const button = await this.driver.findElement(this.macOsButton);

    const isTitleVisible = await title.isDisplayed();
    const isButtonVisible = await button.isDisplayed();

    return isTitleVisible && isButtonVisible;
  }

  async goBack() {
    await this.driver.navigate().back();
    await this.driver.wait(
      until.elementLocated(By.className("special")),
      10000,
    );
  }
}
