import { Actor } from '../src/Actor';
import { Machine } from '../src/Machine';
import { send } from '../src/Messaging';
export default (): boolean => {
  const log: string[] = [];
  type GreetActorStates = 'HELLO' | 'GOODBYE';
  type GreetActorMessages = { type: 'TEST'; name: string };
  class GreetActor extends Actor<GreetActorStates, GreetActorMessages> {
    constructor() {
      super('HELLO');
    }
    message(message: GreetActorMessages) {
      switch (this.state) {
        case 'HELLO':
          log.push(`hello ${message.name}`);
          this.state = 'GOODBYE';
          break;
        case 'GOODBYE':
          log.push(`goodbye ${message.name}`);
          this.state = 'HELLO';
          break;
        default:
          break;
      }
    }
  }
  const machine = Machine<GreetActor>();
  const greetInbox = machine.assign(GreetActor);
  send<GreetActorMessages>(greetInbox, { type: 'TEST', name: 'my friend' });
  send<GreetActorMessages>(greetInbox, { type: 'TEST', name: 'my friend' });
  return log.toString() === 'hello my friend,goodbye my friend';
};
