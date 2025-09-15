import { By, until, Key } from "selenium-webdriver";

export default class NodejsHomePage extends NodejsBasePage {
  constructor(driver) {
    this.driver = driver;
    this.mainText = By.className("special");
    this.buttonsContainer = By.className("layouts-module__mzYk8q__homeLayout");
    this.getNodeButton = By.className(
      "index-module__chIz9G__button index-module__chIz9G__primary !block dark:!hidden",
    );
    this.getSupportButton = By.className("!text-xs");
  }

  async open() {
    await this.driver.get("https://nodejs.org/en");
  }

  async isMainTextDisplayed() {
    const input = await this.driver.findElement(this.mainText);
    return input.isDisplayed();
  }

  async isGetNodeButtonDisplayed() {
    const containers = await this.driver.findElements(this.buttonsContainer);
    if (containers.length === 0) {
      return false;
    }

    const buttons = await this.driver.findElements(this.getNodeButton);
    return buttons.length > 0 && (await buttons[0].isDisplayed());
  }

  async clickGetNodeButton() {
    const containers = await this.driver.findElements(this.buttonsContainer);
    if (containers.length === 0) {
      throw new Error("Buttons container not found");
    }

    const buttons = await this.driver.findElements(this.getNodeButton);
    if (buttons.length === 0) {
      throw new Error("Get Node.js button not found");
    }

    await buttons[0].click();
  }

  async goBack() {
    await this.driver.navigate().back();
  }

  async isGetSupportButtonDisplayed() {
    const button = await this.driver.wait(
      until.elementLocated(this.getSupportButton),
      10000,
    );
    await this.driver.wait(until.elementIsVisible(button), 5000);
    return button.isDisplayed();
  }

  async clickGetSupportButton() {
    const buttons = await this.driver.findElements(this.getSupportButton);
    if (buttons.length === 0) throw new Error("Get Support button not found");
    await buttons[0].click();
  }
}
