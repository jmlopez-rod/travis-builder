import { NPMBuilder, runBuilder } from '@ioffice/tc-builder';

function flow() {
  throw new Error('testing the stack trace');
}

class Builder extends NPMBuilder {
  async test() {
    this.io.log('skipping tests');
    this.io.log('one more log line');
    this.io.log('why not...');
    // return this.io.failure('4 tests failed');
  }

  async beforePublish() {
    this.io.log('skipping before publish');
  }

  async publish() {
    this.io.log('skipping publish');
    this.io.warn('unable to do something after publishing...');
    return '0.0.0-fake';
  }

  async verifyNonRelease() {
    this.io.warn('unable to do something on non-release check...');
    try {
      flow();
    } catch (err) {
      err.message = `Failed in non-release: ${err.message}`;
      return this.io.failure(err);
    }
  }

  async verifyRelease() {
    this.io.log('release is fine');
  }

  async afterVerifyPullRequest() {
    this.io.warn('oops, something wrong on after verify');
  }
}

async function main() {
  const { code } = await runBuilder(Builder);

  process.on('exit', () => {
    process.exit(code);
  });
}

main();
