import { Actor } from '../../../src/Actor';
import { Machine } from '../../../src/Machine';
import { send } from '../../../src/Messaging';

// Define an Actor and it's message types
type GreetActorStates = 'HELLO' | 'GOODBYE';
type GreetActorMessages = { type: 'FORMAL'; name: string } | { type: 'INFORMAL'; name: string };
class GreetActor extends Actor<GreetActorStates, GreetActorMessages> {
  constructor() {
    super('HELLO');
  }
  message(message: GreetActorMessages) {
    switch (this.state) {
      case 'HELLO':
        console.log(message.type === 'FORMAL' ? 'Greetings' : 'Sup', message.name);
        this.state = 'GOODBYE';
        break;
      case 'GOODBYE':
        console.log(message.type === 'FORMAL' ? 'Good Evening' : 'Later', message.name);
        this.state = 'HELLO';
        break;
      default:
        break;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Create a machine
  const machine = Machine<GreetActor>();
  // Create an actor and retrieve it's address
  const greetInbox = machine.assign(GreetActor);
  // Send a message to an actor at an address
  send<GreetActorMessages>(greetInbox, { type: 'FORMAL', name: 'my friend' });
  send<GreetActorMessages>(greetInbox, { type: 'FORMAL', name: 'my friend' });
  send<GreetActorMessages>(greetInbox, { type: 'INFORMAL', name: 'Chicken Butt?' });
  send<GreetActorMessages>(greetInbox, { type: 'INFORMAL', name: 'Gator' });
});
