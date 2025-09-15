import fs from "fs/promises";
import path from "path";

const RESULTS_DIR = path.resolve(process.cwd(), "test-results");
const SCREEN_DIR = path.join(RESULTS_DIR, "screenshots");
const PAGE_DIR = path.join(RESULTS_DIR, "pagesource");

function sanitizeName(name = "") {
  return name.replace(/[^a-z0-9\-_]/gi, "_").slice(0, 120);
}

async function ensureDirs() {
  await fs.mkdir(SCREEN_DIR, { recursive: true });
  await fs.mkdir(PAGE_DIR, { recursive: true });
}

export async function captureOnFailure(driver, testTitle) {
  await ensureDirs();

  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const safe = sanitizeName(testTitle);
  const screenshotPath = path.join(SCREEN_DIR, `${safe}__${ts}.png`);
  const pagePath = path.join(PAGE_DIR, `${safe}__${ts}.html`);

  try {
    const base64 = await driver.takeScreenshot();
    await fs.writeFile(screenshotPath, base64, "base64");
  } catch (err) {
    console.error("Failed to save screenshot:", err);
  }

  try {
    const html = await driver.executeScript("return document.documentElement.outerHTML");
    await fs.writeFile(pagePath, html, "utf8");
  } catch (err) {
    console.error("Failed to save page source:", err);
  }

  return { screenshotPath, pagePath };
}
