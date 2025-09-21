import pkg from 'simple-node-logger';
import path from 'path';
import fs from 'fs';

const { createSimpleFileLogger } = pkg;

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

export const getTestLogger = (logFileName, dir) => {
  let testsDataDir = '';
  if (dir) {
    testsDataDir = createTestRunDataDir(dir);
  } else {
    testsDataDir = createTestRunDataDir(logFileName);
  }
  const clearedLogFileName = logFileName.replace(/[ |,]/gi, '_');
  const fullPath = path.resolve(testsDataDir, clearedLogFileName + '.log');
  const simpleLogger = createSimpleFileLogger(fullPath);
  return simpleLogger;
};

export function createTestLogger(testTitle) {
  const safeTitle = String(testTitle || 'unnamed')
    .replace(/[^a-z0-9\-_]/gi, '_')
    .slice(0, 120);
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const file = path.join(LOG_DIR, `${safeTitle}__${ts}.log`);

  const logFunction = message => {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] INFO: ${message}\n`;

    fs.appendFileSync(file, logLine);

    const mainLogFile = path.join(LOG_DIR, 'test-run.log');
    fs.appendFileSync(mainLogFile, `[${testTitle}] ${logLine}`);

    console.log(`[${timestamp}] INFO: ${message}`);
  };

  return {
    log: logFunction,
    info: logFunction,
  };
}

export default { getTestLogger, createTestLogger };
