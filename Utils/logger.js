import path from 'path';
import fs from 'fs';

const LOG_DIR = path.resolve('test-results/logs');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function createTestRunDataDir(dirName) {
  const testDataDir = path.resolve(LOG_DIR, dirName);
  if (!fs.existsSync(testDataDir)) {
    fs.mkdirSync(testDataDir, { recursive: true });
  }
  return testDataDir;
}

export const createTestLogger = (logFileName, dir) => {
  let testsDataDir = '';
  if (dir) {
    testsDataDir = createTestRunDataDir(dir);
  } else {
    testsDataDir = createTestRunDataDir(logFileName);
  }
  const clearedLogFileName = logFileName.replace(/[ |,]/gi, '_');
  const fullPath = path.resolve(testsDataDir, clearedLogFileName + '.log');

  // Создаем простой logger без external dependencies
  const logger = {
    info: message => {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] INFO: ${message}\n`;
      fs.appendFileSync(fullPath, logMessage);
      console.log(`[${timestamp}] INFO: ${message}`);
    },
    error: message => {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] ERROR: ${message}\n`;
      fs.appendFileSync(fullPath, logMessage);
      console.error(`[${timestamp}] ERROR: ${message}`);
    },
    warn: message => {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] WARN: ${message}\n`;
      fs.appendFileSync(fullPath, logMessage);
      console.warn(`[${timestamp}] WARN: ${message}`);
    },
  };

  return logger;
};
