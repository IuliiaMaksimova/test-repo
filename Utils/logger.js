import logger from "simple-logger";
import path from "path";
import fs from "fs";

const LOG_DIR = path.resolve("test-results/logs");

// Создаем папку для логов
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Настройка основного логгера
logger.level = "info";
logger.sync = true; // Синхронная запись

export function createTestLogger(testTitle) {
  const safeTitle = String(testTitle || "unnamed")
    .replace(/[^a-z0-9\-_]/gi, "_")
    .slice(0, 120);
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(LOG_DIR, `${safeTitle}__${ts}.log`);

  return (message) => {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] INFO: ${message}\n`;

    // Записываем в файл теста
    fs.appendFileSync(file, logLine);

    // Записываем в основной лог
    const mainLogFile = path.join(LOG_DIR, "test-run.log");
    fs.appendFileSync(mainLogFile, `[${testTitle}] ${logLine}`);

    // Выводим в консоль
    console.log(`[${timestamp}] INFO: ${message}`);
  };
}

export default logger;
