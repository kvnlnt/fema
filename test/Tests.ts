import ActorTest from './Actor.test';
import QueueTest from './Queue.test';

const tests: [string, boolean][] = [
  ['ActorTest', ActorTest()],
  ['QueueTest', QueueTest()],
];

tests.forEach(([name, pass]) => {
  if (pass) {
    console.info('PASS', name);
  } else {
    console.error('FAIL', name);
    process.exit(1);
  }
});
