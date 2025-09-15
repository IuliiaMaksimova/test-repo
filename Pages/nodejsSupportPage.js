import { By } from "selenium-webdriver";

export default class NodejsSupportPage extends NodejsBasePage {
  constructor(driver) {
    this.driver = driver;
    this.pageTitle = By.css("h1");
    this.upgradeButton = By.css("a[href='/en/download/']");
  }

  async isPageDisplayed() {
    const title = await this.driver.findElement(this.pageTitle);
    const upgradeButton = await this.driver.findElement(this.upgradeButton);

    const isTitleVisible = await title.isDisplayed();
    const isTableVisible = await upgradeButton.isDisplayed();

    return isTitleVisible && isTableVisible;
  }

  async clickGetSupportButton() {
    const containers = await this.driver.findElements(this.buttonsContainer);
    if (containers.length === 0) throw new Error("Buttons container not found");

    const buttons = await this.driver.findElements(this.getSupportButton);
    if (buttons.length === 0) throw new Error("Get Support button not found");

    await buttons[0].click();
  }
}
