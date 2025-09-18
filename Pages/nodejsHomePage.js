import { By, until } from "selenium-webdriver";
import BaseNodePage from "./baseNodePage.js";

export default class NodejsHomePage extends BaseNodePage {
  constructor(driver, logger) {
    super(driver, logger);
    this.mainText = By.css("h1, .hero, .main-content");
    this.buttonsContainer = By.className("layouts-module__mzYk8q__homeLayout");
    this.getNodeButton = By.css(
      ".index-module__chIz9G__button.index-module__chIz9G__primary",
    );
    this.getSupportButton = By.css('a[href$="/en/eol"]');
  }

  async open() {
    await this.driver.get("https://nodejs.org/en");
  }

  async isMainTextDisplayed() {
    this.logger("Home: isMainTextDisplayed");
    const element = await this.driver.findElement(this.mainText);
    const isVisible = await element.isDisplayed();
    this.logger(`Home: main text visible: ${isVisible}`);
    return isVisible;
  }

  async isGetNodeButtonDisplayed() {
    this.logger("Home: isGetNodeButtonDisplayed");
    const containers = await this.driver.findElements(this.buttonsContainer);
    if (containers.length === 0) {
      this.logger("Home: buttons container not found");
      return false;
    }

    const buttons = await this.driver.findElements(this.getNodeButton);
    const isVisible = buttons.length > 0 && (await buttons[0].isDisplayed());
    this.logger(`Home: Get Node button visible: ${isVisible}`);
    return isVisible;
  }

  async clickGetNodeButton() {
    this.logger("Home: clickGetNodeButton");
    const containers = await this.driver.findElements(this.buttonsContainer);
    if (containers.length === 0) throw new Error("Buttons container not found");

    const buttons = await this.driver.findElements(this.getNodeButton);
    if (buttons.length === 0) throw new Error("Get Node.js button not found");

    await buttons[0].click();
    this.logger(
      "Home: Get Node.js button clicked, navigating to download page",
    );
  }

  async isGetSupportButtonDisplayed() {
    this.logger("Home: isGetSupportButtonDisplayed");
    const buttons = await this.driver.findElements(this.getSupportButton);
    const isVisible = buttons.length > 0 && (await buttons[0].isDisplayed());
    this.logger(`Home: Get Support button visible: ${isVisible}`);
    return isVisible;
  }

  async clickGetSupportButton() {
    this.logger("Home: clickGetSupportButton");
    const buttons = await this.driver.findElements(this.getSupportButton);
    if (buttons.length === 0) throw new Error("Get Support button not found");

    await buttons[0].click();
    this.logger("Home: Get Support button clicked, navigating to support page");
  }

  async goBack() {
    this.logger("Home: goBack");
    await this.driver.navigate().back();
    await this.driver.wait(until.elementLocated(By.css("body")), 10000);
    this.logger("Home: navigated back to previous page");
  }
}
