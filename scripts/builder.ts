import { NPMBuilder } from '@ioffice/tc-builder';

class Builder extends NPMBuilder {
  async test() {
    this.tasks.log('skipping tests');
  }

  async beforePublish() {
    this.tasks.log('skipping before publish');
  }

  async publish() {
    this.tasks.log('skipping publish');
  }

  async verifyNonRelease() {
    this.tasks.log('non release is fine');
  }

  async verifyRelease() {
    this.tasks.log('release is fine');
  }
}

async function main() {
  let exitNumber: number;
  const builder = new Builder();

  try {
    await builder.run();
    exitNumber = 0;
    builder.tasks.log('Process is done.');
  } catch (err) {
    builder.tasks.error(err);
    builder.tasks.log('Process has failed.');
    exitNumber = 1;
  }

  process.on('exit', () => {
    process.exit(exitNumber);
  });
}

main();
