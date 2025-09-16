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

    const handlesBefore = await this.driver.getAllWindowHandles();
    await buttons[0].click();

    try {
      await this.driver.wait(async () => {
        const handlesAfter = await this.driver.getAllWindowHandles();
        return handlesAfter.length > handlesBefore.length;
      }, 10000);
      const handlesAfter = await this.driver.getAllWindowHandles();
      const newHandle = handlesAfter.find((h) => !handlesBefore.includes(h));
      if (newHandle) {
        await this.driver.switchTo().window(newHandle);
      }
    } catch (_) {
      // If no new window appeared, continue in the same tab
    }
  }

  async goBack() {
    const handles = await this.driver.getAllWindowHandles();
    if (handles.length > 1) {
      const current = await this.driver.getWindowHandle();
      // Close current tab and switch to the first/original
      await this.driver.close();
      const remaining = await this.driver.getAllWindowHandles();
      const target = remaining[0];
      await this.driver.switchTo().window(target);
    } else {
      await this.driver.navigate().back();
    }
    await this.driver.wait(until.elementLocated(By.css("body")), 10000);
  }
}
