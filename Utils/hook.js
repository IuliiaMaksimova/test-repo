export const mochaHooks = {
  async beforeEach(done) {
    const grandParent = this.currentTest.parent.parent;
    if (grandParent?.tests.some(test => test.state === 'failed' || test.state === 'pending')) {
      this.skip();
    }
    if (this.currentTest.parent.tests.some(test => test.state === 'failed' || test.state === 'pending')) {
      this.skip();
    }
    done();
  },
};
