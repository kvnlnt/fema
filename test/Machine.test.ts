import { Actor } from '../src/Actor';
import { Machine } from '../src/Machine';
import { send } from '../src/Messaging';
export default (): boolean => {
  let test: string = '';
  type TestActorStates = 'A' | 'B';
  type TestActorMessages = { type: 'ON'; test: string } | { type: 'OFF'; test: string };
  class TestActor extends Actor<TestActorStates, TestActorMessages> {
    constructor() {
      super('A');
    }
    message(message: TestActorMessages) {
      switch (this.state) {
        case 'A':
          test += message.type === 'ON' ? message.test : '';
          this.state = 'B';
          break;
        case 'B':
          test += message.type === 'ON' ? message.test : '';
          this.state = 'A';
          break;
      }
    }
  }
  const machine = Machine<TestActor>();
  const greetInbox = machine.assign(TestActor);
  send<TestActorMessages>(greetInbox, { type: 'ON', test: 'A' });
  send<TestActorMessages>(greetInbox, { type: 'OFF', test: 'A' });
  send<TestActorMessages>(greetInbox, { type: 'ON', test: 'B' });
  send<TestActorMessages>(greetInbox, { type: 'OFF', test: 'B' });
  return test === 'AB';
};
