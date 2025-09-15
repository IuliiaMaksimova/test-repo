import fs from "fs";
import path from "path";

const logDir = path.resolve("test-results/logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFile = path.join(
  logDir,
  `test-run-${new Date().toISOString().replace(/[:.]/g, "-")}.log`,
);

function log(message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFile, line);
  console.log(line.trim()); // в консоль тоже
}

export default log;
