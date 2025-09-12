import { By, until, Key } from "selenium-webdriver";

export default class GoogleHomePage {
  constructor(driver) {
    this.driver = driver;
    this.searchInput = By.name("q"); 
    this.searchButton = By.name("btnK");
    this.luckyButton = By.name("btnI");
  }

  async open() {
    await this.driver.get("https://www.google.com/ncr"); // ncr = no country redirect
  }

  async isSearchInputDisplayed() {
    const input = await this.driver.findElement(this.searchInput);
    return input.isDisplayed();
  }

  async enterSearchQuery(query) {
    const input = await this.driver.findElement(this.searchInput);
    await input.clear();
    await input.sendKeys(query, Key.RETURN);
  }

  async getSearchInputValue() {
    const input = await googleHome.enterSearchQuery(query);
    const title = await googleHome.waitForResults(query);
    expect(title).to.contain(query);
  }

  async waitForResults(query) {
    await this.driver.wait(until.titleContains(query), 5000);
    return this.driver.getTitle();
  }
}
