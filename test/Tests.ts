import ActorTest from './Actor.test';
import MachineTest from './Machine.test';
import MessagingTest from './Messaging.test';
import QueueTest from './Queue.test';

const tests: [string, boolean][] = [
  ['ActorTest', ActorTest()],
  ['QueueTest', QueueTest()],
  ['MessagingTest', MessagingTest()],
  ['MachineTest', MachineTest()],
];

tests.forEach(([name, pass]) => {
  if (pass) {
    console.info('PASS', name);
  } else {
    console.error('FAIL', name);
    process.exit(1);
  }
});
