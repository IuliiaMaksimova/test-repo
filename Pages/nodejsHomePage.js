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
    const button = await this.driver.findElement(this.getNodeButton);
    return button.isDisplayed();
  }

  async clickGetNodeButton() {
    const button = await this.driver.findElement(this.getNodeButton);
    await button.click();
  }

  async isGetSupportButtonDisplayed() {
    const button = await this.driver.wait(
      until.elementLocated(this.getSupportButton),
      10000,
    );
    return button.isDisplayed();
  }

  async clickGetSupportButton() {
    const button = await this.driver.findElement(this.getSupportButton);
    await button.click();
  }
  async goBack() {
    await this.driver.navigate().back();
    await this.driver.wait(until.elementLocated(this.mainText), 10000);
  }
}
