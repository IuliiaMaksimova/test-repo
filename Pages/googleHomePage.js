import { By, until, Key } from "selenium-webdriver";

export default class GoogleHomePage {
  constructor(driver) {
    this.driver = driver;
    this.searchInput = By.name("q"); 
    this.searchButton = By.name("btnK");
    this.luckyButton = By.name("btnI");
    this.resultLinks = By.css("div#search a");
  }

  async open() {
    await this.driver.get("https://www.google.com/ncr"); // ncr = no country redirect
  }

  async waitingTime() {
    await driver.sleep(2000)
  }

  async isSearchInputDisplayed() {
    const input = await this.driver.findElement(this.searchInput);
    return input.isDisplayed();
  }

  async waitingTime() {
    await driver.sleep(2000)
  }

  async enterSearchQuery(query) {
    const input = await this.driver.findElement(this.searchInput);
    await input.clear();
    await input.sendKeys(query, Key.RETURN);
  }

  async waitingTime() {
    await driver.sleep(2000)
  }

  async getSearchInputValue() {
    const input = await this.driver.findElement(this.searchInput);
    return input.getAttribute("value");
  }

  async waitingTime() {
    await driver.sleep(2000)
  }

  async waitForResults(query) {
    await this.driver.wait(until.titleContains(query), 5000);
    return this.driver.getTitle();
  }

  async waitingTime() {
    await driver.sleep(2000)
  }

  async getResultLinks() {
    const linksElements = await this.driver.findElements(this.resultLinks);
    const links = [];
    for (let el of linksElements) {
      const href = await el.getAttribute("href");
      if (href) links.push(href);
    }
    return links;
  }
  
async waitingTime() {
    await driver.sleep(2000)
  }

  async clickResultLink(partialHref) {
  const links = await this.driver.findElements(By.css("a"));
  for (let el of links) {
    const href = await el.getAttribute("href");
    if (href && href.includes(partialHref)) {
      await el.click();
      return true;
    }
  }
  return false;
}
}
