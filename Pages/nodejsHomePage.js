import { By, until } from "selenium-webdriver";
import NodejsBasePage from "./baseNodePage.js";

export default class NodejsHomePage extends NodejsBasePage {
  constructor(driver) {
    super(driver);
    this.mainText = By.className("special");
    this.buttonsContainer = By.className("layouts-module__mzYk8q__homeLayout");
    this.getNodeButton = By.css(
      ".index-module__chIz9G__button.index-module__chIz9G__primary",
    );
    this.getSupportButton = By.className("!text-xs");
  }

  async open() {
    await this.driver.get("https://nodejs.org/en");
  }

  async isMainTextDisplayed() {
    const element = await this.driver.findElement(this.mainText);
    return element.isDisplayed();
  }

  async isGetNodeButtonDisplayed() {
    const containers = await this.driver.findElements(this.buttonsContainer);
    if (containers.length === 0) return false;

    const buttons = await this.driver.findElements(this.getNodeButton);
    return buttons.length > 0 && (await buttons[0].isDisplayed());
  }

  async clickGetNodeButton() {
    const containers = await this.driver.findElements(this.buttonsContainer);
    if (containers.length === 0) throw new Error("Buttons container not found");

    const buttons = await this.driver.findElements(this.getNodeButton);
    if (buttons.length === 0) throw new Error("Get Node.js button not found");

    await buttons[0].click();
  }

  async isGetSupportButtonDisplayed() {
    const buttons = await this.driver.findElements(this.getSupportButton);
    return buttons.length > 0 && (await buttons[0].isDisplayed());
  }

  async clickGetSupportButton() {
    const buttons = await this.driver.findElements(this.getSupportButton);
    if (buttons.length === 0) throw new Error("Get Support button not found");

    await buttons[0].click();
  }

  async goBack() {
    await this.driver.navigate().back();
    await this.driver.wait(until.elementLocated(this.mainText), 10000);
  }
}
