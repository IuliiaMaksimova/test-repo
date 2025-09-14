import { By, until } from "selenium-webdriver";
import NodejsBasePage from "./baseNodePage.js"; // если наследуешь базовый класс

export default class NodejsHomePage extends NodejsBasePage {
  constructor(driver) {
    super(driver);
    this.mainText = By.css("h1");
    this.buttonsContainer = By.className("layouts-module__mzYk8q__homeLayout");
    this.getNodeButton = By.className(
      "index-module__chIz9G__button index-module__chIz9G__primary !block dark:!hidden"
    );
    this.getSupportButton = By.css("a[href='/en/eol']");
  }

  async open() {
    await this.driver.get("https://nodejs.org/en");
  }

  async isMainTextDisplayed() {
    const input = await this.driver.findElement(this.mainText);
    return input.isDisplayed();
  }

  async isGetNodeButtonDisplayed() {
    const container = await this.driver.findElement(this.buttonsContainer);
    const button = await this.driver.findElement(this.getNodeButton);
    return button.isDisplayed();
  }

  async clickGetNodeButton() {
    const container = await this.driver.findElement(this.buttonsContainer);
    const button = await this.driver.findElement(this.getNodeButton);
    await button.click();
  }

  async goBack() {
    await this.driver.navigate().back();
  }

  async isGetSupportButtonDisplayed() {
    const button = await this.driver.wait(
      until.elementLocated(this.getSupportButton),
      10000
    );
    await this.driver.wait(until.elementIsVisible(button), 5000);
    return button.isDisplayed();
  }

  async clickGetSupportButton() {
    const button = await this.driver.findElement(this.getSupportButton);
    await button.click();

    await this.driver.wait(
      async () => {
        const url = await this.driver.getCurrentUrl();
        return url.includes("eol");
      },
      10000,
      "URL did not change to eol"
    );
  }
}
