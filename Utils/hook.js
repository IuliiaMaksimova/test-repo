// Test states that should trigger dependency skipping
const FAILED_STATE = 'failed';
const PENDING_STATE = 'pending';
const SKIP_STATES = [FAILED_STATE, PENDING_STATE];

// Helper function to check if any test in a collection has failed or is pending
const hasFailedOrPendingTests = tests => {
  return tests?.some(test => SKIP_STATES.includes(test.state)) || false;
};

export const mochaHooks = {
  async beforeEach(done) {
    const grandParent = this.currentTest.parent.parent;

    // Skip current test if any test in the grand parent suite has failed or is pending
    if (hasFailedOrPendingTests(grandParent?.tests)) {
      this.skip();
    }

    // Skip current test if any test in the parent suite has failed or is pending
    if (hasFailedOrPendingTests(this.currentTest.parent.tests)) {
      this.skip();
    }

    done();
  },
};
