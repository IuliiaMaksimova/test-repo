import { mochaHooks } from './Utils/hook.js';

export default {
  timeout: 30000,
  retries: 0,
  require: [],
  globals: ['driver', 'basePage'],
  reporter: 'spec',
  ui: 'bdd',
  recursive: true,
  extension: ['js'],
  spec: ['Tests/**/*.test.js'],
  exit: true,
  ...mochaHooks,
};
