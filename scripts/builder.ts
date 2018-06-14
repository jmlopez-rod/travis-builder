import { NPMBuilder } from '@ioffice/tc-builder';

class Builder extends NPMBuilder {
  test() {
    this.tasks.log('skipping tests');
  }

  beforePublish() {
    this.tasks.log('skipping before publish');
  }

  publish() {
    this.tasks.log('skipping publish');
  }
}

async function main() {
  let exitNumber: number;
  const builder = new Builder();

  try {
    await builder.run();
    exitNumber = 0;
    pb.tasks.log('Process is done.');
  } catch (err) {
    pb.tasks.error(err);
    pb.tasks.log('Process has failed.');
    exitNumber = 1;
  }

  process.on('exit', () => {
    process.exit(exitNumber);
  });
}

main();
