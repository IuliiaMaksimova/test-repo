import fs from "fs";
import path from "path";

const LOG_DIR = path.resolve("test-results/logs");
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

export function createTestLogger(testTitle) {
  const safeTitle = String(testTitle || "unnamed")
    .replace(/[^a-z0-9\-_]/gi, "_")
    .slice(0, 120);
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(LOG_DIR, `${safeTitle}__${ts}.log`);

  return (message) => {
    const line = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(file, line);
    console.log(line.trim());
  };
}
