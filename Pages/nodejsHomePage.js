import { By, until } from "selenium-webdriver";
import NodejsBasePage from "./baseNodePage.js"; // если наследуешь базовый класс

export default class NodejsHomePage extends NodejsBasePage {
  constructor(driver) {
<<<<<<< HEAD
    super(driver);
    this.mainText = By.css("h1");
    this.buttonsContainer = By.className("layouts-module__mzYk8q__homeLayout");
    this.getNodeButton = By.className(
      "index-module__chIz9G__button index-module__chIz9G__primary !block dark:!hidden"
    );
    this.getSupportButton = By.css("a[href='/en/eol']");
=======
    this.driver = driver;
    this.mainText = By.className("special");
    this.buttonsContainer = By.className("layouts-module__mzYk8q__homeLayout");
    this.getNodeButton = By.className(
      "index-module__chIz9G__button index-module__chIz9G__primary !block dark:!hidden",
    );
    this.getSupportButton = By.className("!text-xs");
>>>>>>> da7b404 (New baseNodePage and new tests)
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

<<<<<<< HEAD
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
=======
  async clickGetSupportButton() {
    const buttons = await this.driver.findElements(this.getSupportButton);
    if (buttons.length === 0) throw new Error("Get Support button not found");
    await buttons[0].click();
  }
>>>>>>> da7b404 (New baseNodePage and new tests)
}
